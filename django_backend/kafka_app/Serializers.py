from rest_framework import serializers
from .models import SinglePointIndication, Controls, Measurements, DoublePointIndication

# Base serializer for common fields
class BaseEventSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    timestamp = serializers.DateTimeField()
    ioa = serializers.CharField()
    value = serializers.CharField()
    description = serializers.CharField()
    topic = serializers.CharField()

# You can extend this with model-specific fields if needed
class SinglePointIndicationSerializer(BaseEventSerializer):
    pass

class ControlsSerializer(BaseEventSerializer):
    pass

class MeasurementsSerializer(BaseEventSerializer):
    pass

class DoublePointIndicationSerializer(BaseEventSerializer):
    pass

# Union Serializer to handle the combined queryset
class UnionSerializer(serializers.Serializer):
    def to_representation(self, instance):
        if isinstance(instance, SinglePointIndication):
            return SinglePointIndicationSerializer(instance).data
        elif isinstance(instance, Controls):
            return ControlsSerializer(instance).data
        elif isinstance(instance, Measurements):
            return MeasurementsSerializer(instance).data
        elif isinstance(instance, DoublePointIndication):
            return DoublePointIndicationSerializer(instance).data
