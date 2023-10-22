const mqtt = require('mqtt');

const mqttClient = mqtt.connect('mqtt://localhost:1883');

mqttClient.on('connect', () => {
    console.log('Connected to the MQTT broker');
});

// Define an MQTT endpoint
const publishMessage = (req, res) => {
    const { topic, message } = req.body;

    mqttClient.publish(topic, message, (err) => {
        if (err) {
            console.error('Error publishing MQTT message:', err);
            res.status(500).send('Error publishing MQTT message');
        } else {
            console.log(`Published MQTT message on topic ${topic}: ${message}`);
            res.send('MQTT message published');
        }
    });
};

module.exports = {
    publishMessage,
};
