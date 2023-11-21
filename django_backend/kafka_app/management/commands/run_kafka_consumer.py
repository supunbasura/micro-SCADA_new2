# your_app/management/commands/run_kafka_consumer.py
from django.core.management.base import BaseCommand
from kafka_app.tasks import kafka_consumer

class Command(BaseCommand):
    help = 'Run the Kafka consumer'

    def handle(self, *args, **options):
        self.stdout.write("Starting Kafka consumer...")
        kafka_consumer()
        
