from rest_framework import serializers
from .models import Turn
from ..puesto.serializers import PlaceSerializer
from ..servicio.serializers import ServiceSerializer
from ..usuario.serializers import UserListSerializer
from rest_framework import status


class TurnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turn
        fields = '__all__'
    def to_representation(self, instance):
        return {
            'Numero del turno': instance.turn_num,
            'Prioridad del turno': instance.user_id.e_condicion


        }