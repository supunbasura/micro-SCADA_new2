from django.urls import path
from . import views

urlpatterns = [
    path('send/', views.publish_mqtt_message, name='send_to_kafka'),
    # path('api/books/', views.fetch_books, name="fetch_books"),
    path('api/spindication/', views.fetch_singlepointindication, name="fetch_indication"),
]
