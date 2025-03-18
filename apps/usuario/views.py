from sys import api_version
from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import UserSerializer,UserTestSerializer,UserListSerializer,UserCreationSerializer
from .models import Users
@api_view(['GET', 'POST', 'DELETE'])
def UserApiView(request):
    if request.method == 'GET':
        users = Users.objects.all()
        serializer = UserListSerializer(users, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = UserCreationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET', 'PUT', 'DELETE'])
def UserExplain(request, pk):
    if request.method == 'GET':
        user = Users.objects.filter(pk=pk).first()
        serializer = UserSerializer(user)
        if user is None:
            return Response({"error": "Usuario no encontrado"}, status=404)
        return Response(serializer.data)
    if request.method == 'PUT':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
