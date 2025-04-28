from django.shortcuts import render
from .serializers import PlaceSerializer
from rest_framework import generics
from rest_framework import status,viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Place


class PlaceListAPIView(APIView):
    def get(self, request):
        places = Place.objects.all()
        places_serializer = PlaceSerializer(places, many=True)
        
        return Response(places_serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        place_serializer = PlaceSerializer(data=request.data)
        
        if place_serializer.is_valid():
            place_serializer.save()
            
            return Response(place_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(place_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PlaceDetailAPIView(APIView):
    def get(self, request, pk):
        place = get_object_or_404(Place, pk=pk)
        place_serializer = PlaceSerializer(place)
        
        return Response(place_serializer.data)
    
    def put(self, request, pk):
        place = get_object_or_404(Place, pk=pk)
        place_serializer = PlaceSerializer(place, data=request.data)
        
        if place_serializer.is_valid():
            place_serializer.save()
            
            return Response(place_serializer.data, status=status.HTTP_200_OK)
        
        return Response(place_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk):
        place = get_object_or_404(Place, pk=pk)
        place.delete
        
        return Response({'message': 'Punto Eliminado.'}, status=status.HTTP_200_OK)