from rest_framework import serializers
from .models import Service

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'
    def to_representation(self, instance):
        return{

            'tipo del servicio' : instance.service_type,
            'Descripcion del servicio' : instance.service_description,
            'Categoria del servicio' :  instance.type_id.type_rol if instance.type_id is not None else '',
        }