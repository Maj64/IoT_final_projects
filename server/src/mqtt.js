import mqtt from "mqtt";
import sensorService from "./services/sensorService";
import sensorDataService from "./services/sensorDataService";

//setup mqtt
const host = "127.0.0.1";
const port = 9001;
const clientId = `mqttx_6e6920e7`;
const connectUrl = `ws://${host}:${port}`;
const receivedTopic = "sensor";

const client = mqtt.connect(connectUrl, {
  clientId,
  username: "lamntk",
  password: "123",
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
}); // create a client

// client.on("connect", function () {
client.subscribe(receivedTopic, function (err) {
  if (!err) {
    console.log("Connected");
  }
});
// });

client.on("message", async (topic, message) => {
  // console.log(JSON.parse(message));
  console.log("topic: ", topic, message);
  if (topic === receivedTopic) {
    if (message) {
      // Check data
      const { keyCode, ...sensorData } = JSON.parse(message);
      // console.log(keyCode, { ...sensorData, keyCode });
      // Send data to database
      const sensorId = await sensorService.getSensorsIdByKeyCode(keyCode);
      await sensorDataService.createNewSensorData({ ...sensorData, sensorId });
    }
  }
});

module.exports = client;
