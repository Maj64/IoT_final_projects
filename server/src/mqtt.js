import mqtt from "mqtt";
import sensorService from "./services/sensorService";
import sensorDataService from "./services/sensorDataService";

//setup mqtt
const protocol = "wss";
const host = "2e40b1502386486aa13fa1bf324ee13b.s2.eu.hivemq.cloud";
const port = 8884;
const clientId = "mqttjs_" + Math.random().toString(16).substr(2, 8);
const connectUrl = `${protocol}://${host}:${port}/mqtt`;
const receivedTopic = "sensor";

const client = mqtt.connect(connectUrl, {
  clientId,
  username: "myrindavermouth",
  password: "nW4@W@LVkJ2ie33",
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
  // console.log("topic: ", topic, message);
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
