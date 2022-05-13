# Module that serialize the Task object, to be transmitted to the api

from rest_framework import serializers
from .models import *

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
class FileSerializer(serializers.Serializer):
    file = serializers.FileField(max_length=None, allow_empty_file=False)