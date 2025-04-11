from http.client import responses
from sys import api_version
from django.shortcuts import render
from datetime import datetime
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from django.contrib.sessions.models import Session
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import status, request
from rest_framework import generics
from .models import Users, Turn
from .serializers import TurnSerializer


class ShowTurn(generics.ListCreateAPIView):
    serializer_class = TurnSerializer
    #Obtenemos los turnos relacionados al usuario que hace la consulta
    def get_queryset(self):
        user = self.request.user
        return Turn.objects.filter(user_id=user.id)
    def get(self, request, *args, **kwargs):
        return Response({'message': 'Turnos mostrados correctamente'}, status=status.HTTP_200_OK)


class CreateTurn(generics.CreateAPIView):
    def post(self, request, *args, **kwargs):
        serializer = TurnSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Turno creado correctamente'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)