from rest_framework import serializers
from .models import Turn
from ..place.serializers import PlaceSerializer
from ..service.serializers import ServiceSerializer
from ..user.serializers import UserListSerializer
from rest_framework import status


class TurnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turn
        fields = '__all__'
