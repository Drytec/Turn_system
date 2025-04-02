
from django.shortcuts import render
from .serializers import PlaceSerializer
from rest_framework import generics
from rest_framework import status,viewsets
from .models import Place

from rest_framework.response import Response

class PlaceViewSet(viewsets.ModelViewSet):
    #La queryset establece que codicion se va a usar para mostrar los objetos creados
    queryset =  Place.objects.all()
    serializer_class = PlaceSerializer
    #Metodos que se pueden definir y personalizar a conveniencia
    def put(self,request,pk=None):
        return Response({'Error':'Tienes que poner datos'})
    #def list(self, request):
    def post(self, request, *args, **kwargs):
        serializer = PlaceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Lugar creado correctamente!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request,pk=None): #aca se pondria la actualizacion de estado si se hace eliminacion logica y no directa en la BD
        Place = Place.objects.get(place_id=pk)
        #if place:
        #place.state = False
        #place.save()
        #return Response({'message':'producto eliminado correctamente'})
        Place.delete()
        return Response({'message':'Lugar eliminado correctamente!'})


class PlaceListAPIView(generics.ListCreateAPIView):
    serializer_class = PlaceSerializer
    def get_queryset(self):
        return self.get_serializer().Meta.model.objects.filter( place_location__isnull=False)
    def post(self, request, *args, **kwargs):
        serializer = PlaceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Lugar creado correctamente!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PlaceRetrieveAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PlaceSerializer

    def get_queryset(self):
        return self.get_serializer().Meta.model.objects.filter( place_location__isnull=False)





