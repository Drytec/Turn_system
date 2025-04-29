from .serializers import PlaceSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Place


class PlaceListAPIView(APIView):
    def get(self, request):
        places = Place.objects.all()
        serializer = PlaceSerializer(places, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = PlaceSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PlaceDetailAPIView(APIView):
    def get_place(self, pk):
        return Place.objects.filter(place_id=pk).first()

    def get(self, request, pk):
        place = self.get_place(pk)

        if place:
            serializer = PlaceSerializer(place)

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response({'message:' 'Punto de Atención no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        place = self.get_place(pk)
        serializer = PlaceSerializer(place, data=request.data)

        if place:
            if serializer.is_valid():
                serializer.save()

                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message:' 'Punto de Atención no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        place = self.get_place(pk)

        if place:
            place.delete()

            return Response({'message': 'Punto Eliminado.'}, status=status.HTTP_200_OK)

        return Response({'message:' 'Punto de Atención no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
