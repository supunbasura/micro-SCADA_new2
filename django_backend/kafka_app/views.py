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
from .models import SinglePointIndication
from .models import Controls
from django.core.cache import cache
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .mqtt_client import publish_message
from django.core import serializers
from datetime import datetime
from rest_framework.decorators import api_view

mqtt_thread_started = False

MQTT_TOPIC = "TestTopic"

@api_view(['POST'])
def publish_mqtt_message(request):
    
    Type=46
    Address=5000
    Value=request.data.get("status", 1)
    Timestamp=datetime.now().strftime("%Y:%m:%d:%H:%M:%S")
    # Timestamp="2023:12:11:19:39:24"
    
    Type2=46
    Address2=5001

    status_description = [{"Type": Type, "Address": Address, "Value": Value, "Timestamp": Timestamp}, {"Type": Type2, "Address": Address2, "Value": Value, "Timestamp": Timestamp}]
    # status_description={"Type":Type, "Address":Address, "Value":Value,"Timestamp":Timestamp}
    
    
    # VOLTAGE =' '
    # CURRENT = ' '
    # FREQ = ' '
    # POW = ' '
    # statusviewer= 'Device - WebApp'
    # description = "QA1 Switched On : Location-Katugasthota "
    # button_status = request.data.get("status", 1)
    # status_description = {"CB_POS": button_status, "description": description ,"VOLTAGE":VOLTAGE,"CURRENT":CURRENT,"FREQ":FREQ,"POW":POW,"statusviewer":statusviewer}
    
    payload = json.dumps(status_description)

    # Use the publish_message function to publish the message
    publish_message(MQTT_TOPIC, payload)

    return JsonResponse({'redirect_url': 'http://localhost:3000/'})

# @api_view(['GET'])
# def fetch_books(request):
#     books = Book.objects.all()
#     data = serializers.serialize('json', books)
#     return JsonResponse(data, safe=False)

@api_view(['GET'])
def fetch_singlepointindication(request):
    spIndication = SinglePointIndication.objects.all()
    data = serializers.serialize('json', spIndication)
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def fetch_Controls(request):
    # lbscontrols = Controls.objects.filter(ioa=5000).order_by('timestamp').first()
    lbscontrols = Controls.objects.filter(ioa=5000).order_by('timestamp').all()
    # lbscontrols = Controls.objects.all()
    data = serializers.serialize('json', lbscontrols)
    # print("data",data);
    return JsonResponse(data, safe=False)