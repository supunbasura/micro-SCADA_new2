# your_project/routing.py
from channels.routing import ProtocolTypeRouter, URLRouter
import kafka_backend_.routing

application = ProtocolTypeRouter({
    'websocket': URLRouter(kafka_backend_.routing.websocket_urlpatterns),
})
