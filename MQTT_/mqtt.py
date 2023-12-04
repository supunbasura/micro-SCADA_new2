import paho.mqtt.publish as publish
import paho.mqtt.client as mqtt
import random
import time
import json

# MQTT Broker information
mqtt_broker = "broker.hivemq.com"  # Replace with your MQTT broker address
mqtt_port = 1883  # Replace with your MQTT broker port

# List of MQTT topics
mqtt_topics = ["matt-client"]
# Variable names
variable_names = ["CB_POS", "SF_LOW", "SPR_DIS", "MCB_OK", "BAT_LOW", "CURRENT", "VOLTAGE","FREQ", "POW"]

# Function to generate and publish random values to topics
def publish_random_values():
    while True:
        # Generate random values for each variable
        cb_pos = random.choice(["00", "01","10","11"])  # Double-point value for cb_pos
        sf_low = random.choice(["0", "1"])  # Single-point value for sf_low
        spr_dis = random.choice(["0", "1"])  # Categorical value for spr_dis
        mcb_ok = random.choice(["0", "1"])  # Categorical value for mcb_ok
        bat_low = random.choice(["0", "1"])  # Boolean value for bat_low
        current = round(random.uniform(48, 52), 2)  # Double-point value for current
        voltage = round(random.uniform(32.7, 33.3), 2)  # Double-point value for voltage
        frequency = round(random.uniform(49.5,50.5),2)
        power = round(random.uniform(0.9405,0.9595),2)


        # Create a dictionary mapping variable names to their values
        variables = {
            "CB_POS": cb_pos,
            "SF_LOW": sf_low,
            "SPR_DIS": spr_dis,
            "MCB_OK": mcb_ok,
            "BAT_LOW": bat_low,
            "CURRENT": current,
            "VOLTAGE": voltage,
            "FREQ": frequency,
            "POW": power,
        }

        # Convert the dictionary to a JSON string
        message = json.dumps(variables)

        # Publish the message to each topic
        for topic in mqtt_topics:
            publish.single(topic, message, hostname=mqtt_broker, port=mqtt_port)

            # Print the published data
            print(f"Published message: {message} to {topic}")

        
        # Wait for a moment before generating the next set of random values
        time.sleep(3)

if __name__ == "__main__":
    # Start publishing random values to topics
    publish_random_values()
