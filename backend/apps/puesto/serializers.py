from rest_framework import serializers
from .models import Place,PlaceService
from ..servicio.models import Service
from ..tipo.models import Types
from ..tipo.serializers import TypeSerializer
from rest_framework import status


class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = '__all__'
    #Para la represetacion de muchos a muchos con las llaves foraneas se llama a la instancia de la llave y luego
    #al atributo que se quiere mostrar
    def to_representation(self, instance):
        return {
            'id': instance.place_id,
            'Nombre del lugar:': instance.place_name,
            'Ubicacion:' : instance.place_location ,
            'Tipo de lugar:': instance.type_id.type_rol if instance.type_id is not None else '',
        }
class PlaceCreateSerializer(serializers.ModelSerializer):
    service_ids = serializers.ListField(
        child=serializers.IntegerField()
    )

    class Meta:
        model = Place
        fields = ['place_name', 'place_location', 'type_id', 'service_ids']

    def create(self, validated_data):
        service_ids = validated_data.pop('service_ids', [])
        place = Place.objects.create(**validated_data)

        # Crear relaciones en la tabla intermedia
        for sid in service_ids:
            service = Service.objects.get(service_id=sid)
            PlaceService.objects.create(place=place, service=service)

        return place
    def to_representation(self, instance):
        # Obtener los servicios relacionados a este lugar
        services = PlaceService.objects.filter(place=instance)
        service_data = [
            {
                "tipo": s.service.service_type,
                "descripcion": s.service.service_description,
            }
            for s in services
        ]

        return {
            'Nombre del lugar': instance.place_name,
            'Ubicación': instance.place_location,
            'Tipo de lugar': instance.type_id.type_rol if instance.type_id else '',
            'Servicios': service_data
        }
