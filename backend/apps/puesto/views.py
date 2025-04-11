
from django.shortcuts import render
from .serializers import PlaceSerializer, PlaceCreateSerializer
from rest_framework import generics
from rest_framework import status,viewsets
from .models import Place,PlaceService
from ..servicio.models import Service
from rest_framework.views import APIView
from rest_framework.response import Response


class PlaceViewSet(viewsets.ModelViewSet):
    #La queryset establece que codicion se va a usar para mostrar los objetos creados
    queryset =  Place.objects.all()
    serializer_class = PlaceCreateSerializer
        #Metodos que se pueden definir y personalizar a conveniencia
    def update(self, request, pk=None):
        try:
            place = Place.objects.get(place_id=pk)
        except Place.DoesNotExist:
            return Response({'error': 'Lugar no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        # Validamos y deserializamos el body
        serializer = self.get_serializer(place, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()

            # Actualizar servicios si se incluyen
            service_ids = request.data.get('service_ids')
            if service_ids is not None:
                # Reemplazar completamente los servicios
                PlaceService.objects.filter(place=place).delete()
                for sid in service_ids:
                    try:
                        service = Service.objects.get(service_id=sid)
                        PlaceService.objects.create(place=place, service=service)
                    except Service.DoesNotExist:
                        continue

            return Response({'message': 'Lugar actualizado con servicios'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self,request,pk=None): #aca se pondria la actualizacion de estado si se hace eliminacion logica y no directa en la BD
        place = Place.objects.get(place_id=pk)
        #if place:
        #place.state = False
        #place.save()
        #return Response({'message':'producto eliminado correctamente'})
        place.delete()
        return Response({'message':'Lugar eliminado correctamente!'} , status=status.HTTP_200_OK )


class PlaceListAPIView(generics.ListAPIView):
    queryset = Place.objects.all()
    serializer_class = PlaceCreateSerializer


class PlaceRetrieveAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PlaceSerializer

    def get_queryset(self):
        return self.get_serializer().Meta.model.objects.filter( place_location__isnull=False)

class AddServicesToPlaceAPIView(APIView):
    def post(self, request, place_id):
        service_ids = request.data.get('service_ids', [])

        try:
            place = Place.objects.get(place_id=place_id)
        except Place.DoesNotExist:
            return Response({'error': 'Lugar no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        added = []
        for sid in service_ids:
            try:
                service = Service.objects.get(service_id=sid)
                # Evita duplicados si ya existe la relación
                PlaceService.objects.get_or_create(place=place, service=service)
                added.append(sid)
            except Service.DoesNotExist:
                continue

        return Response({'added_services': added}, status=status.HTTP_201_CREATED)