const fs = require("fs");
const mqtt = require("mqtt");
const config = require("../config.json");
const client = mqtt.connect(`mqtt://${config.mhost}:${config.mport}`);
client.on("connect", function() {
  console.log(`MQTT:connect to ${config.mhost}:${config.mport}`);
});

module.exports = function(name) {
  client.publish(
    "pushFile",
    JSON.stringify({
      name: name,
      content: fs.readFileSync(`./upload/${name}`)
    }),
    {
      qos: 0,
      retain: true
    }
  );
};
