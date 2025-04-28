from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .serializers import ServiceSerializer
from .models import Service


class ServiceListAPIView(APIView):
    def get(self, request):
        services = Service.objects.all()
        services_serializer = ServiceSerializer(services, many=True)
        
        return Response(services_serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        service_serializer = ServiceSerializer(data=request.data)
        
        if service_serializer.is_valid():
            service_serializer.save()
            
            return Response(service_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(service_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ServiceDetailAPIView(APIView):
    def get(self, request, pk):
        service = get_object_or_404(Service, pk=pk)
        service_serializer = ServiceSerializer(service)
        
        return Response(service_serializer.data)
    
    def put(self, request, pk):
        service = get_object_or_404(Service, pk=pk)
        service_serializer = ServiceSerializer(service, data=request.data)
        
        if service_serializer.is_valid():
            service_serializer.save()
            
            return Response(service_serializer.data, status=status.HTTP_200_OK)
        
        return Response(service_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk):
        service = get_object_or_404(Service, pk=pk)
        service.delete
        
        return Response({'message': 'Servicio Eliminado.'}, status=status.HTTP_200_OK)