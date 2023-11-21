import paho.mqtt.client as mqtt
import json
import time

# Define the on_connect callback
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to MQTT Broker!")
    else:
        print("Failed to connect, return code %d\n", rc)

# Define the on_publish callback
def on_publish(client, userdata, mid):
    print("Message Published...")

# Initialize the MQTT Client
local_client = mqtt.Client(clean_session=True)
local_client.on_publish = on_publish
local_client.on_connect = on_connect

# Set username and password for MQTT broker
# user = "supun"
# password = "SBGssc20001227"
# local_client.username_pw_set(user, password=password)

# Set up TLS - specify paths to your tls certificates if required
local_client.tls_set()

# Connect to the MQTT broker asynchronously
#broker_address = "56044a04a814414994ecad0b8b465fef.s1.eu.hivemq.cloud"
broker_address="broker.hivemq.com"
broker_port = 8883  # or your MQTT broker's TLS port
local_client.connect_async(broker_address, broker_port, 60)

# Start the loop in the background (non-blocking)
local_client.loop_start()

# Function to publish messages
def publish_message(topic, payload):
    result, mid = local_client.publish(topic, payload)
    # Handle errors or use result to confirm the publication
    if result == mqtt.MQTT_ERR_SUCCESS:
        print(f"Published message to topic {topic}")
    else:
        print(f"Failed to publish message to topic {topic}")
