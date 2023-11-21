import paho.mqtt.client as mqtt
import threading
import json
import psycopg2
from confluent_kafka import Producer
from aiohttp import web
import asyncio

DATABASES = {
    'NAME': 'tsdb',
    'USER': 'postgres',
    'PASSWORD': ' ',  # Adjust your password
    'HOST': 'localhost',
    'PORT': '5432',
}

connection = psycopg2.connect(
    dbname=DATABASES['NAME'],
    user=DATABASES['USER'],
    password=DATABASES['PASSWORD'],
    host=DATABASES['HOST'],
    port=DATABASES['PORT']
)

cursor = connection.cursor()

mqtt_thread_started = False

# Kafka local broker configuration
KAFKA_BROKER = "localhost:9092"
KAFKA_TOPIC = "test1"

conf = {
    'bootstrap.servers': KAFKA_BROKER,
}
producer = Producer(conf)
mqtt.Client.connected_flag = False

# HiveMQ Cloud connection parameters
# broker_address = "56044a04a814414994ecad0b8b465fef.s1.eu.hivemq.cloud"
broker_address="broker.hivemq.com"
broker_port = 8883
MQTT_TOPIC = "matt-client"
# user = "supun"
# password = "SBGssc20001227"

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to broker")
        client.connected_flag = True
    else:
        print("Connection failed: ", rc)

def on_message(client, userdata, message):
    received_payload = message.payload.decode('utf-8')
    producer.produce(KAFKA_TOPIC, value=received_payload)
    print("Payload: ", received_payload)

    with connection:
        try:
            book_data = json.loads(received_payload)
            # Send book_data to frontend
            # Insert into the database
            insert_query = """
                INSERT INTO kafka_app_book (status, received_at)
                VALUES (%s, NOW());
            """
            cursor.execute(insert_query, (book_data["status"],))
            connection.commit()
            print("Data saved to TimescaleDB.")

        except json.JSONDecodeError:
            print("Failed to decode JSON.")
        except Exception as e:
            print(f"Error saving to TimescaleDB: {e}")
            
def start_mqtt():
    bridge_client = mqtt.Client(clean_session=True)
    bridge_client.on_connect = on_connect
    bridge_client.on_message = on_message
    # bridge_client.username_pw_set(user, password=password)
    bridge_client.tls_set()  
    bridge_client.connect(broker_address, broker_port)
    bridge_client.subscribe(MQTT_TOPIC)
    bridge_client.loop_forever()

if __name__ == "__main__":
    print("Starting MQTT to Kafka bridge...")
    if not mqtt_thread_started:
        thread = threading.Thread(target=start_mqtt)
        thread.start()
        mqtt_thread_started = True
        print("Bridging started")
    else:
        print("Bridging already started")