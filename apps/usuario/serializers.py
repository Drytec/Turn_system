from rest_framework import serializers
from .models import Users
from ..tipo.models import Types

#Clase que representa al usuario
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
    def create(self, validated_data):
        user = Users.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
#Clase para unicamente listar usuarios
class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
    def to_representation(self, instance):
        data = super().to_representation(instance)
        return {'Nombre del usuario' : data['name'],
                'Correo electronico:' : data['email'],
                'Prioridad': data['e_condicion']}


class UserCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['email', 'password', 'username', 'name','age','conditions']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # Agregar valores predeterminados para campos que el usuario NO debe proporcionar
        validated_data['type_id'] =  Types.objects.get(type_id=1)
        if(validated_data['conditions']==True and (validated_data['age']>55 or validated_data['age']<12)):
            validated_data['e_condicion'] = "maxima"

        elif ((validated_data['age']>55 or validated_data['age']<12) or validated_data['conditions']==True):
            validated_data['e_condicion'] = "alta"
        else:
            validated_data['e_condicion'] = "estandar"
        user = Users.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user



class UserTestSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100, required=True)
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()

    def validate_name(self, value):
        if 'XXX' in value:
            raise serializers.ValidationError('Este no es un nombre permitido')
        return value

    def validate_email(self, value):
        if value =='':
            raise serializers.ValidationError('Por Favor dijite un email')
        return value

    def validate(self, data):
        return data

    def create(self, validated_data):
        return  Users.objects.create(**validated_data)
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.email = validated_data.get('email', instance.email)
        instance.save()