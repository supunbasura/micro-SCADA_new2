from django.shortcuts import render
from django.http import JsonResponse
from .kafka_producer import send_message
import paho.mqtt.client as mqtt
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
import time
import threading
import json
from django.db import transaction
import asyncio
from rest_framework.decorators import api_view
from .models import Book
from django.core.cache import cache
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .mqtt_client import publish_message
from django.core import serializers

mqtt_thread_started = False

MQTT_TOPIC = "matt-client"

@api_view(['POST'])
def publish_mqtt_message(request):
    description = "QA1 Switched On : Location-Katugasthota : Device-WebApp"
    button_status = request.data.get("status", "off")
    status_description = {"status": button_status, "description": description}
    payload = json.dumps(status_description)

    # Use the publish_message function to publish the message
    publish_message(MQTT_TOPIC, payload)

    return JsonResponse({"status": "Message Published"})

@api_view(['GET'])
def fetch_books(request):
    books = Book.objects.all()
    data = serializers.serialize('json', books)
    return JsonResponse(data, safe=False)


