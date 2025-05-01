from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.db.models import Count
from django.utils import timezone
# from ..user.models import User
from .models import Turn
from ..place.models import Place
from .serializers import TurnSerializer, CreateTurnSerializer


"""class UserTurnsAPIView(APIView):
    def get_user(self, pk):
        return User.objects.filter(user_id=pk).first()

    def get(self, request, pk):
        owner = self.get_user(pk)

        if not owner:
            return Response({'message': 'Usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        turns = Turn.objects.filter(owner=owner)
        serializer = TurnSerializer(turns, many=True)

        if turns.exists():
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response({'message': 'No se encontraron turnos.'}, status=status.HTTP_200_OK)"""


class CloseTurnAPIView(APIView):
    def get_turn(self, pk):
        return Turn.objects.filter(turn_id=pk).first()

    def put(self, request, pk):
        turn = self.get_turn(pk)

        if not turn:
            return Response({'message': 'Turno no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        turn.active = False
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
            # owner_id = serializer.validated_data.get('owner')
            place_id = serializer.validated_data.get('place_id')

            # if not owner_id or not place_id:
            # return Response({'message': 'Faltan datos obligatorios.'}, status=status.HTTP_400_BAD_REQUEST)

            if not place_id:
                return Response({'message': 'Faltan datos obligatorios.'}, status=status.HTTP_400_BAD_REQUEST)

            # owner = User.objects.filter(user_id=owner_id).first(9)

            # if not owner:
                # return Response({'message': 'Usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

            turn_count = Turn.objects.filter(
                place_id=place_id).count()

            turn_number = (turn_count % 999) + 1

            turn_name = f"A{turn_number:03d}"

            turn = serializer.save(turn_name=turn_name)

            response_serializer = TurnSerializer(turn)

            return Response(response_serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TurnStatsAPIView(APIView):
    def get(self, request):
        stats = (
            Place.objects
            .annotate(turn_count=Count('turn', distinct=True))
            .values('place_name', 'turn_count')
            .order_by('place_name')
        )

        data = [
            {
                'place_name': entry['place_name'],
                'turn_count': entry['turn_count']
            }
            for entry in stats
        ]

        return Response(data, status=status.HTTP_200_OK)
