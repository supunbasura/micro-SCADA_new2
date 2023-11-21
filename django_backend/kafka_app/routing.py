from django.urls import re_path,path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/simple_message/$', consumers.SimpleMessageConsumer.as_asgi()),
    # path('ws/books/', BookConsumer.as_asgi()),
    # re_path(r'ws/book_data/$', consumers.BookConsumer.as_asgi()),
]
