from rest_framework import serializers
from .models import Place
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




