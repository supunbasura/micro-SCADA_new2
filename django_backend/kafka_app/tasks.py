import threading
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from confluent_kafka import Consumer
import json

# Kafka local broker configuration
KAFKA_BROKER = "localhost:9092"
KAFKA_TOPIC = "test1"

def kafka_consumer():
    conf = {
        'bootstrap.servers': KAFKA_BROKER,
        'group.id': 'group_id',
        'auto.offset.reset': 'earliest'
    }

    consumer = Consumer(conf)
    consumer.subscribe([KAFKA_TOPIC])

    channel_layer = get_channel_layer()

    while True:
        message = consumer.poll(1.0)
        if message is None:
            continue
        if message.error():
            print("Consumer error: {}".format(message.error()))
            continue

        payload = message.value().decode('utf-8')
        
        try:
            book_data = json.loads(payload)
            # send the message to the frontend
            async_to_sync(channel_layer.group_send)('simple_message_group', {
                'type': 'send_simple_message',
                'message': book_data
            })
        except json.JSONDecodeError:
            print(f"Invalid JSON received: {payload}")
    
    consumer.close()
    
def start_kafka_consumer():
    thread = threading.Thread(target=kafka_consumer)
    thread.daemon = True
    thread.start()
