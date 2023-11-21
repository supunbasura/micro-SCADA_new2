from django.urls import path
from . import views

urlpatterns = [
    path('send/', views.publish_mqtt_message, name='send_to_kafka'),
    #path('start-bridge/', views.bridge_mqtt_to_kafka, name='start_bridge'),
    path('api/books/', views.fetch_books, name="fetch_books"),
    #path('get_button_status/', views.get_button_status),
]
