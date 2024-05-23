#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include "DHT.h"
#include <BH1750.h>
#include <Wire.h>


#define DHTPIN 2     
#define DHTTYPE 11
#define BUZZER 12


const char* ssid = "FTTH_Hex";
const char* password = "03031204";
String deviceID = "Hex";

DHT dht(DHTPIN, DHTTYPE);
BH1750 lightMeter;


void setup() {
  Serial.begin(9600);
  Serial.println();

  pinMode(BUZZER, OUTPUT);

  dht.begin();

  // Initialize the I2C bus (BH1750 library doesn't do this automatically)
  Wire.begin();
  // On esp8266 you can select SCL and SDA pins using Wire.begin(D4, D3);
  // For Wemos / Lolin D1 Mini Pro and the Ambient Light shield use
  // Wire.begin(D2, D1);

  lightMeter.begin();

  Serial.println(F("BH1750 Test begin"));
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

void loop() {

  // Wait a few seconds between measurements.
  delay(2000);

  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();
  // Read temperature as Fahrenheit (isFahrenheit = true)
  float f = dht.readTemperature(true);

  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    // return;
  }

  // Compute heat index in Fahrenheit (the default)
  float hif = dht.computeHeatIndex(f, h);
  // Compute heat index in Celsius (isFahreheit = false)
  float hic = dht.computeHeatIndex(t, h, false);

  Serial.print(F("Humidity: "));
  Serial.print(h);
  Serial.print(F("%  Temperature: "));
  Serial.print(t);
  Serial.print(F("°C "));
  Serial.print(f);
  Serial.print(F("°F  Heat index: "));
  Serial.print(hic);
  Serial.print(F("°C "));
  Serial.print(hif);
  Serial.println(F("°F"));// Nothing here

  float lux = lightMeter.readLightLevel();
  Serial.print("Light: ");
  Serial.print(lux);
  Serial.println(" lx");
  delay(1000);

  HTTPClient http;
  String URL = "http://192.168.1.6:3001"; // Works with HTTP
  WiFiClient client; // Create a WiFiClient object to pass to HTTPClient
  http.begin(client, URL); // Use the updated begin() function

  http.addHeader("Content-Type", "application/x-www-form-urlencoded");

  String postData = "StorageID=1&TemperatureInC="+String(t)+"&TemperatureInF="+String(f)+"&Humidity="+String(h)+"&Light="+String(lux);
  int httpCode = http.POST(postData);
  Serial.println(httpCode);
  if(httpCode == 300){
    digitalWrite(BUZZER, HIGH);
  }
  if(httpCode == 200){
    digitalWrite(BUZZER, LOW);
  }
  if (httpCode > 0) {
    String payload = http.getString();
    Serial.println(payload); // Print response
  }
  
  http.end();
  Serial.println("END");
  delay(2000);


}