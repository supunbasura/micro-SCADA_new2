from django.apps import AppConfig
import os

class KafkaAppConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "kafka_app"

    # def ready(self):
    #     if os.environ.get("RUN_MAIN") != "true":
    #         print(f"ji from process {os.getpid()}")
    #         from .tasks import kafka_consumer
    #         kafka_consumer()
    
    def ready(self):
        from . import mqtt_client
