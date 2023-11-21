from confluent_kafka import Producer

conf = {
    'bootstrap.servers': 'localhost:9092',
}

producer = Producer(conf)

def send_message(topic_name, message):
    producer.produce(topic_name, key=None, value=message)
    producer.flush()
