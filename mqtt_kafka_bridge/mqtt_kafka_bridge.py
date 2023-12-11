import paho.mqtt.client as mqtt
import threading
import json
import psycopg2
from confluent_kafka import Producer
from aiohttp import web
import asyncio

DATABASES = {
    'NAME': 'tssl',
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
MQTT_TOPIC = "TestTopic"
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
            print(book_data);
            
            
            # Set status based on CB_POS value
            # cb_pos = book_data.get("CB_POS")
            # if cb_pos == "01":
            #     book_data["status"] = "on"
            # elif cb_pos == "10":
            #     book_data["status"] = "off"
            # elif cb_pos == "00":
            #     book_data["status"] = "Error! 00"
            # elif cb_pos == "11":
            #     book_data["status"] = "Error! 11"

            # if 'description' not in book_data or book_data["description"] is None:
            #     book_data["description"] = f'QA1 Switched {book_data["status"]} : Location-Katugasthota'
            
            # if 'statusviewer' not in book_data or book_data["statusviewer"] is None:
            #     book_data["statusviewer"] = 'Device - Mobile'
                
            # # Insert into the database
            # insert_query = """
            #     INSERT INTO kafka_app_book (status, received_at, description,VOLTAGE, CURRENT, FREQ, POW,statusviewer)
            #     VALUES (%s, NOW(), %s,%s,%s,%s,%s,%s);
            # """
            # cursor.execute(insert_query, (book_data["status"], book_data["description"],book_data["VOLTAGE"],book_data["CURRENT"],book_data["FREQ"],book_data["POW"],book_data["statusviewer"]))
            # connection.commit()
            # print("Data saved to TimescaleDB.")

            address_descriptions = {
                10000: "Panel Control position Local/ Supervisory",
                10001: "Relay Protection Setting Group Position",
                10002: "Over Current Operated",
                10003: "Earth Fault Operated",
                10004: "Line/Transformer Differential Operated",
                10005: "Relay Faulty",
                10006: "Trip Circuit Faulty",
                10007: "Circuit Breaker Failure",
                10008: "SF6 Low Pressure Alarm",
                10009: "SF6 Low Pressure Lock Out",
                10010: "11kV panel Auxiliary DC MCB Trip/ Off",
                10011: "11kV panel Auxiliary AC MCB Trip/ Off",
                10020: "Panel Control position Local/ Supervisory",
                10021: "Relay Protection Setting Group Position",
                10022: "Over Current Operated",
                10023: "Earth Fault Operated",
                10024: "-- spare --",
                10025: "Relay Faulty",
                10026: "Trip Circuit Faulty",
                10027: "Circuit Breaker Failure",
                10028: "SF6 Low Pressure Alarm",
                10029: "SF6 Low Pressure Lock Out",
                10030: "11kV panel Auxiliary DC MCB Trip/ Off",
                10031: "11kV panel Auxiliary AC MCB Trip/ Off",
                10040: "Panel Control position Local/ Supervisory",
                10041: "Relay Protection Setting Group Position",
                10042: "Over Current Operated",
                10043: "Earth Fault Operated",
                10044: "-- spare --",
                10045: "Relay Faulty",
                10046: "Trip Circuit Faulty",
                10047: "Circuit Breaker Failure",
                10048: "SF6 Low Pressure Alarm",
                10049: "SF6 Low Pressure Lock Out",
                10050: "11kV panel Auxiliary DC MCB Trip/ Off",
                10051: "11kV panel Auxiliary AC MCB Trip/ Off"
            }



            insert_query_template = """
                INSERT INTO {} (timeStamp,ioa,value,description,topic)
                VALUES (%s,%s,%s,%s,%s);
            """

            
            for data_entry in book_data:
                # if 'description' not in data_entry or data_entry["description"] is None:
                #     description = f'Address {data_entry["Address"]}'
                    
                if 'topic' not in data_entry or data_entry["topic"] is None:
                    topic = 'CEB_LBS_1_QQ'
                    
                address = data_entry["Address"]
                description = address_descriptions.get(address, f'Address {address}')
                    
                table_name = None
                type = data_entry.get("Type", "")
                
                

                if type == 30:
                    table_name = 'kafka_app_singlepointindication'
                    
                    
                # if type == 46:
                #     table_name = 'kafka_app_controls'
                    
                # if type == 31:
                #     table_name = 'kafka_app_doublepointindication'
                
                if table_name:
                    timestamp = data_entry["Timestamp"]
                    ioa = data_entry["Address"]
                    value = data_entry["Value"]

                    insert_query = insert_query_template.format(table_name)

                    try:
                        cursor = connection.cursor()
                        cursor.execute(insert_query, (timestamp, ioa, value,description,topic))
                        connection.commit()
                        print("Data saved to TimescaleDB.")
                    except Exception as e:
                        print(f"Error saving to TimescaleDB: {e}")
                else:
                    print("No valid table name found for the data entry.")


            
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