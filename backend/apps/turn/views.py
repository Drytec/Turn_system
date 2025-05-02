from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.db.models import Count
from django.utils import timezone
from datetime import timedelta
from ..user.models import CustomUser
from .models import Turn
from ..place.models import Place
from .serializers import TurnSerializer, CreateTurnSerializer


class UserTurnsAPIView(APIView):
    def get_user(self, uid):
        return CustomUser.objects.filter(user_id=uid).first()

    def get(self, request, uid):
        owner = self.get_user(uid)

        if not owner:
            return Response({'message': 'Usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        turns = Turn.objects.filter(owner=owner)
        serializer = TurnSerializer(turns, many=True)

        if turns.exists():
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response({'message': 'No se encontraron turnos.'}, status=status.HTTP_200_OK)


class UserActiveTurnAPIView(APIView):
    def get_user(self, uid):
        return CustomUser.objects.filter(user_id=uid).first()

    def get(self, request, uid):
        user = self.get_user(uid)

        if not user:
            return Response({'message': 'Usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        turn = Turn.objects.filter(owner=user, active=True).first()

        if not turn:
            return Response({'message': 'No tiene turno activo.'}, status=status.HTTP_200_OK)

        time_eight_hours_ago = timezone.now() - timedelta(hours=8)

        past_turns = Turn.objects.filter(
            active=False,
            place_id=turn.place_id,
            date_created__gte=time_eight_hours_ago,
        )

        if past_turns.exists():
            total_minutes = sum(t.turn_attended_time for t in past_turns)
            expected_minutes = round(total_minutes / past_turns.count(), 2)
        else:
            expected_minutes = 5.0

        serializer = TurnSerializer(turn)

        return Response({**serializer.data, 'expected_attendacy_time': expected_minutes}, status=status.HTTP_200_OK)


class CloseTurnAPIView(APIView):
    def get_turn(self, tid):
        return Turn.objects.filter(turn_id=tid).first()

    def get_user(self, uid):
        return CustomUser.objects.filter(user_id=uid).first()

    def put(self, request, uid, tid):
        turn = self.get_turn(tid)
        attended_by = self.get_user(uid)

        if not turn:
            return Response({'message': 'Turno no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        if not attended_by:
            return Response({'message': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        turn.active = False
        turn.attended_by = attended_by
        turn.date_closed = timezone.now()
        turn.save

        serializer = TurnSerializer(turn)

        return Response(serializer.data, status=status.HTTP_200_OK)


class TurnAPIView(APIView):
    def get(self, request):
        turns = Turn.objects.all()
        serializer = TurnSerializer(turns, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CreateTurnSerializer(data=request.data)

        if serializer.is_valid():
            owner_id = serializer.validated_data.get('owner')
            place_id = serializer.validated_data.get('place_id')

            if not owner_id or not place_id:
                return Response({'message': 'Faltan datos obligatorios.'}, status=status.HTTP_400_BAD_REQUEST)

            owner = CustomUser.objects.filter(user_id=owner_id).first(9)

            if not owner:
                return Response({'message': 'Usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

            turn_count = Turn.objects.filter(
                place_id=place_id).count()

            turn_priority = owner.priority

            turn_number = (turn_count % 999) + 1

            turn_name = f"{turn_priority}-{turn_number}"

            turn = serializer.save(
                turn_priority=turn_priority, turn_name=turn_name)

            response_serializer = TurnSerializer(turn)

            return Response(response_serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TurnStatsAPIView(APIView):
    def get(self, request):
        places = Place.objects.all()

        data = []

        for place in places:
            past_turns = Turn.objects.filter(place_id=place, active=False)

            if past_turns.exists():
                total_minutes = sum(t.turn_attended_time for t in past_turns)
                avg_time = round(total_minutes / past_turns.count(), 2)
            else:
                avg_time = "Desconocido"

            active_turn_count = Turn.objects.filter(
                place_id=place, active=True).count()
            closed_turn_count = past_turns.count()
            total_turn_count = active_turn_count + closed_turn_count

            data.append({
                'place_name': place.place_name,
                'total_turn_count': total_turn_count,
                'active_turn_count': active_turn_count,
                'closed_turn_count': closed_turn_count,
                'avg_attendancy_time': avg_time
            })

        return Response(data, status=status.HTTP_200_OK)


class NextTurnAPIView(APIView):
    def get_place(self, pid):
        return Place.objects.filter(place_id=pid).first()

    def get_user(self, uid):
        return CustomUser.objects.filter(user_id=uid).first()

    def get(self, request, uid, pid):
        place = self.get_place(pid)
        attended_by = self.get_user(uid)

        if not place:
            return Response({'message:' 'Punto no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        if not attended_by:
            return Response({'message:' 'Usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        for priority in ['H', 'M', 'L']:
            turn = Turn.objects.filter(
                place_id=place,
                active=True,
                turn_priority=priority
            ).order_by('date_created').first()

            if turn:
                turn.active = False
                turn.attended_by = attended_by
                turn.date_closed = timezone.now()
                turn.save()

                serializer = TurnSerializer(turn)
                return Response(serializer.data, status=status.HTTP_200_OK)

        return Response({'message': 'No hay turnos activos.'}, status=status.HTTP_200_OK)
