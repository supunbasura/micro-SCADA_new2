"""
ASGI config for kafka_backend_ project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
import kafka_app.routing 
from kafka_app.tasks import start_kafka_consumer

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "kafka_backend_.settings")

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": URLRouter(kafka_app.routing.websocket_urlpatterns),
})

start_kafka_consumer()