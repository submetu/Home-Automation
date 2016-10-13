/*
  Basic MQTT example

  This sketch demonstrates the basic capabilities of the library.
  It connects to an MQTT server then:
  - publishes "hello world" to the topic "outTopic"
  - subscribes to the topic "inTopic", printing out any messages
    it receives. NB - it assumes the received payloads are strings not binary

  It will reconnect to the server if the connection is lost using a blocking
  reconnect function. See the 'mqtt_reconnect_nonblocking' example for how to
  achieve the same result without blocking the main loop.

*/

#include <SPI.h>
#include <Ethernet.h>
#include <PubSubClient.h>

int lightstate = 0;
unsigned long temperaturetime = 0;
int val;

// Update these with values suitable for your network.
byte mac[]    = {  0xDE, 0xED, 0xBA, 0xFE, 0xFE, 0xED };
IPAddress ip(192, 168, 1, 99);
IPAddress server(192, 168, 1, 43);

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  if (!strcmp(topic, "on"))
    lightstate = 1;
  else if (!strcmp(topic, "off"))
    lightstate = 0;
}

EthernetClient ethClient;
PubSubClient client(ethClient);

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("arduinoClient")) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish("outTopic", "hello world");
      // ... and resubscribe
      client.subscribe("on");
      client.subscribe("off");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void switchlight() {
  if (lightstate)
    digitalWrite(6, HIGH);
  else
    digitalWrite(6, LOW);
}

void temperature() {

  if (abs(millis() - temperaturetime) >= 5000) {
    val = analogRead(A1);
    float mv = ( val/1024.0)*5000; 
    float cel = mv/10;
    char result[5];
    dtostrf(cel, 3, 2, result); 
    client.publish("outTopic",result);
    Serial.println(result);
    temperaturetime = millis();
  }

  

}



void setup()
{
  Serial.begin(57600);

  client.setServer(server, 1883);
  client.setCallback(callback);

  Ethernet.begin(mac, ip);
  // Allow the hardware to sort itself out
  delay(1500);
  pinMode(6, OUTPUT);
  pinMode(A1, INPUT);
}

void loop()
{
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  switchlight();

  temperature();


}
