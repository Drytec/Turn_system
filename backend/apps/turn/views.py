from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from django.contrib.sessions.models import Session
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework import status
from ..user.models import User
from .models import Turn
from .serializers import TurnSerializer


class UserTurnsAPIView(APIView):
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

        return Response({'message': 'No se encontraron turnos.'}, status=status.HTTP_200_OK)


class CloseTurnAPIView(APIView):
    def get_turn(self, pk):
        return Turn.objects.filter(turn_id=pk).first()

    def put(self, request, pk):
        turn = self.get_turn(pk)

        if not turn:
            return Response({'message': 'Turno no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        turn.active = False
        turn.save

        serializer = TurnSerializer(turn)

        return Response(serializer.data, status=status.HTTP_200_OK)


class CreateTurnAPIView(APIView):
    def post(self, request):
        serializer = TurnSerializer(data=request.data)

        if serializer.is_valid():
            owner = serializer.validated_data.get('owner')
            service = serializer.validated_data.get('service_id')
            place = serializer.validated_data.get('place_id')

            if not owner or not service or not place:
                return Response({'message': 'Faltan datos obligatorios.'}, status=status.HTTP_400_BAD_REQUEST)

            if not owner:
                return Response({'message': 'Usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

            turn_count = Turn.objects.filter(
                service_id=service, place_id=place).count()

            turn_number = turn_count % 1000

            turn_name = f"{owner.priority}{turn_number:03d}"

            turn = serializer.save(turn_name=turn_name)

            response_serializer = TurnSerializer(turn)

            return Response(response_serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
