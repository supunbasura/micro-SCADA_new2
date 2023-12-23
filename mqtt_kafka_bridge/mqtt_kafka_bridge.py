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
# MQTT_TOPIC = "TestTopic"
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
                1: "Group 1 Trip",
                2: "Lockout (Any)",
                3: "Remote Control",
                4: "AR initiated",
                5: "Prot initiated",
                6: "Open (Any)",
                7: "Open (Prot)",
                8: "Open (0C1F)",
                9: "Open (0C2F)",
                10: "Open (0C3F)",
                11: "Open (EF1F)",
                12: "Open (EF2F)",
                13: "Open (EF3F)",
                14: "Open (SEFF)",
                15: "Open(OCLL3)",
                16: "Open(EFLL3)",
                17: "Open(UV1)",
                18: "Open(UV2)",
                19: "Open(UV3)",
                20: "Open(Remote)",
                21: "Open(Local)",
                23: "Closed(Any)",
                24: "Closed(AR)",
                25: "Closed(IO)",
                26: "Closed(Local)",
                27: "Prot On",
                28: "Group2 On",
                29: "Group3 On",
                30: "Group4 On",
                31: "Prot On",
                32: "EF On",
                33: "SEF On",
                34: "UV On",
                35: "CLP On",
                36: "LL On",
                37: "AR On",
                38: "ABR On",
                39: "Malfunction",
                40: "Warning",
                41: "OSM Disconnected",
                42: "Dummy Control",
                # single point
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
                10051: "11kV panel Auxiliary AC MCB Trip/ Off",
                
                # Double point
                8000: "CB POSITION",
                8001: "DISC POSITION",
                8002: "ES POSITION",
                8010: "CB POSITION",
                8011: "DISC POSITION",
                8012: "ES POSITION",
                8020: "CB POSITION",
                8021: "DISC-1 POSITION",
                8022: "DISC-2 POSITION",
                8023: "ES-1 POSITION",
                8024: "ES-2 POSITION",
                
                # Controls
                5000: "Circuit Breaker Open/Close",
                5001: "Disconnector Open/ Close",
                5002: "Relay Alarm/ Trip Indication Reset",
                5010: "Circuit Breaker Open/Close",
                5011: "Disconnector Open/ Close",
                5012: "Relay Alarm/ Trip Indication Reset",
                5020: "Circuit Breaker Open/Close",
                5021: "Disconnector-1 Open/ Close",
                5022: "Disconnector-2 Open/ Close",
                
                # Messurements
                1000: "CURRENT R PHASE",
                1001: "CURRENT Y PHASE",
                1002: "CURRENT B PHASE",
                1003: "FREQUENCY",
                1004: "VOLTAGE R PHASE",
                1005: "VOLTAGE Y PHASE",
                1006: "VOLTAGE B PHASE",
                1007: "APPARENT POWER",
                1008: "REACTIVE POWER",
                1009: "APPARENT POWER",
                1010: "REACTIVE POWER",
                1020: "CURRENT R PHASE",
                1021: "CURRENT Y PHASE",
                1022: "CURRENT B PHASE",
                1023: "FREQUENCY",
                1024: "VOLTAGE R PHASE",
                1025: "VOLTAGE Y PHASE",
                1026: "VOLTAGE B PHASE",
                1027: "APPARENT POWER",
                1028: "REACTIVE POWER",
                1029: "APPARENT POWER",
                1030: "REACTIVE POWER",
                1040: "CURRENT R PHASE",
                1041: "CURRENT Y PHASE",
                1042: "CURRENT B PHASE",
                1043: "FREQUENCY",
                1044: "VOLTAGE R PHASE - BUS 01",
                1045: "VOLTAGE Y PHASE - BUS 01",
                1046: "VOLTAGE B PHASE - BUS 01",
                1047: "VOLTAGE R PHASE - BUS 02",
                1048: "VOLTAGE Y PHASE - BUS 02",
                1049: "VOLTAGE B PHASE - BUS 02",
                1050: "APPARENT POWER",
                1051: "REACTIVE POWER",
                1052: "APPARENT POWER",
                1053: "REACTIVE POWER"
            }



            insert_query_template = """
                INSERT INTO {} (timeStamp,ioa,value,description,topic)
                VALUES (%s,%s,%s,%s,%s);
            """
            
            # timestamp_cur = book_data[0]["Timestamp"] if book_data else None
            cur_voltage = 0
            cur_current = 0
            cur_freq = 0
            cur_power = 0
            
            for item in book_data:
                
                if item["Type"] == 9:
                    if item["Address"] == 10004:
                        cur_voltage = item["Value"]
                    
                    elif item["Address"] == 10005:
                        cur_current = item["Value"]
                        
                    elif item["Address"] == 10000:
                        cur_freq = item["Value"]
                        
                    elif item["Address"] == 10001:
                        cur_power = item["Value"]
            
            
            # Insert into the database
            insert_query1 = """
                INSERT INTO kafka_app_book (status, received_at, description,VOLTAGE, CURRENT, FREQ, POW,statusviewer)
                VALUES (%s,NOW(), %s,%s,%s,%s,%s,%s);
            """
            cursor = connection.cursor()
            cursor.execute(insert_query1, ("not set", "not set", cur_voltage, cur_current, cur_freq, cur_power,"not set"))
            connection.commit()
            print("Data saved to TimescaleDB.")
            
            
            for data_entry in book_data:
                if 'topic' not in data_entry or data_entry["topic"] is None:
                    topic = 'CEB_LBS_1_QQ'
                    
                address = data_entry["Address"]
                description = address_descriptions.get(address, f'Address {address}')
                    
                table_name = None
                type = data_entry.get("Type", "")
                
                # if 0 <= type <= 40 and type != 9 and type != 31:
                if type == 1:
                    table_name = 'kafka_app_singlepointindication'
                    
                #comment           
                if type == 46:
                    table_name = 'kafka_app_controls'
                    
                if type == 31:
                    table_name = 'kafka_app_doublepointindication'

                if type == 9:
                    table_name = 'kafka_app_measurements'
                # endcomment
                
                
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