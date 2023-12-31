from django.urls import path
from . import views

urlpatterns = [
    path('send/', views.publish_mqtt_message, name='send_to_kafka'),
    # path('api/books/', views.fetch_books, name="fetch_books"),
    path('api/spindication/', views.fetch_singlepointindication, name="fetch_indication"),
    path('api/Controls/', views.fetch_Controls, name="fetch_Controls"),
    path('api/fetchEvent/', views.fetch_EventViewer, name="fetch_EventViewer"),
    path('api/Event/', views.fetch_Event, name="fetch_EventViewer"),
    path('api/fetch_single_data/', views.fetch_single_data, name="fetch_single_data"),
]
