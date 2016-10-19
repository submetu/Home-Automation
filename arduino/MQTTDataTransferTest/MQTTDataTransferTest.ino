#include <ESP8266WiFi.h>
#include <PubSubClient.h>

// Update these with values suitable for your network.

const char* ssid = "TTNET_ZyXEL_ACEA";
const char* password = "###";
const char* mqtt_server = "192.168.1.43";

WiFiClient espClient;
PubSubClient client(espClient);
long earlier = 0;
char msg[50];
int value = 0;

void setup_wifi() {

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);


  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  char copiedstring[120] = {0};
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");

  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
    copiedstring[i] = (char)payload[i];
  }
  copiedstring[length] = '\0';
  Serial.println();



  if (!strcmp(copiedstring, "1")) {
    digitalWrite(13, LOW);
    Serial.println("ONES");
  }
  else {
    digitalWrite(13, HIGH);
    Serial.println("ZEROS");
  }


}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "Extension Cord";
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish("extout", "This is your extension cord speaking. Bow down to your automated overlords.");
      // ... and resubscribe
      client.subscribe("extin");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 1 seconds");
      // Wait 5 seconds before retrying
      delay(1000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  pinMode(13, OUTPUT);
  digitalWrite(13, HIGH); //Make sure extension is powered off at startup//
}

void loop() {

  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  long now = millis();
  if (now - earlier > 10000) {
    earlier = now;
  }
}
