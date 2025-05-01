from msilib.schema import ListView

from django.shortcuts import render
from django.views import View
from rest_framework import viewsets
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from .serializers import ServiceSerializer
from .models import Service

# Create your views here.

class ServiceViewSet(viewsets.GenericViewSet):
    serializer_class = ServiceSerializer
    def get_queryset(self):
        return self.get_serializer().Meta.model.objects.all()

    def get_object(self):
        obj=self.get_queryset(service_id=self.kwargs['pk'])
        return obj
    def list(self, request):
        data = self.get_queryset()
        data = self.serializer_class(data, many=True)
        return Response(data.data)

    def create(self, request, *args, **kwargs):
        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def update(self, request,pk=None):
        if self.get_object().exists:
            serializer = self.serializer_class(instance=self.get_object().get(), data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

        return

    def destroy(self, request, pk=None):
        if self.get_object().exists():
            self.get_object().get().delete()
            return Response({'message':'Servicio eliminad0 correctamente!'}, status=status.HTTP_200_OK)
        return Response({'message':'', 'error':'Servicio no encontrado!'}, status=status.HTTP_400_BAD_REQUEST)

class ServicePlaceAPIView(ListAPIView):
    serializer_class = ServiceSerializer
    def get_queryset(self,pk=None):
       # pk = self.kwargs.get('pk')
        return self.get_serializer().Meta.model.objects.filter(service_id=pk)