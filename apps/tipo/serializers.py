from rest_framework import serializers
from .models import Types

class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Types
        fields = '__all__'