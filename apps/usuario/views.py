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
from rest_framework import status
from .serializers import UserSerializer,UserListSerializer,UserCreationSerializer,LoginSerializer
from .models import Users
@api_view(['GET', 'POST', 'DELETE'])


def UserApiView(request):
    if request.method == 'GET':
        users = Users.objects.all()
       # turn = turn.objects.filter(user_id=request.user.id)
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


class Login(ObtainAuthToken):
    def post(self, request, *args, **kwargs):

        user = authenticate(username="lauramartinez", password="mypassword")
        #loginSerializer = LoginSerializer(data=request.data)
        loginSerializer = self.serializer_class(data=request.data, context={'request': request})
        print(loginSerializer)
        if loginSerializer.is_valid():

            user = loginSerializer.validated_data['user']
            userSerializer=UserListSerializer(user)
            if user.is_authenticated:
                token,created = Token.objects.get_or_create(user=user)
                if created:
                    return Response({"token":token.key,
                                     "user":userSerializer.data,
                                     "message":"Logueado",
                                     },status=status.HTTP_201_CREATED)
                else:
                    sessions = Session.objects.filter(expire_date__lte=datetime.now())
                    if sessions.exists():
                        for session in sessions:
                            session_data = session.get_decoded()
                            if user.id == int(session_data.get('_auth_user_id')):
                                session.delete()
                    token.delete()
                    token = Token.objects.create(user=user)
                    return Response({"token":token.key,
                                     "user":userSerializer.data,
                                     "message":"Logueado",
                                     },status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "Usuario no puede ingresar"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            print("ewreororo")
            return Response(loginSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Logout(APIView):
    def post(self, request,*args, **kwargs):
        try:
            token = request.POST.get('token')
            token = Token.objects.filter(key=token).first()
            if token:
                user = token.user
                sessions = Session.objects.filter(expire_date__lte=datetime.now())
                if sessions.exists():
                    for session in sessions:
                        session_data = session.get_decoded()
                        if user.id == int(session_data.get('_auth_user_id')):
                            session.delete()
                session_mesagge ='Sesiones de usuario eliminadas'
                token.delete()
                tokenMesagger="Token eliminado"
                return Response(session_mesagge, status=status.HTTP_200_OK)
            return Response({'Error':'Token no encontrado'},status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'Error':str(e)},status=status.HTTP_409_CONFLICT)