from rest_framework import serializers
from .models import User, Role
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate


# Clase que representa al usuario
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
# Clase para unicamente listar usuarios


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        return {'Nombre del usuario': data['name'],
                'Correo electronico:': data['email'],
                'Prioridad': data['e_condition']}


class UserCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'username', 'name', 'age', 'conditions']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        validated_data['type_id'] = Types.objects.get(type_id=1)
        if (validated_data['conditions'] == True and (validated_data['age'] > 55 or validated_data['age'] < 12)):
            validated_data['e_condition'] = "maxima"

        elif ((validated_data['age'] > 55 or validated_data['age'] < 12) or validated_data['conditions'] == True):
            validated_data['e_condition'] = "alta"
        else:
            validated_data[('e_condit'
                            'ion')] = "estandar"
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        if email and password:
            # Autenticar por email
            user = authenticate(username=email, password=password)

            if user:
                data["user"] = user
            else:
                raise serializers.ValidationError("Credenciales inválidas")
        else:
            raise serializers.ValidationError(
                "Se requieren email y contraseña")

        return data


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'
