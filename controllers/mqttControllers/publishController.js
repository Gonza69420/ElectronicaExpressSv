const mqtt = require('mqtt');

const mqttClient = mqtt.connect('mqtt://localhost:1883');

mqttClient.on('connect', () => {
    console.log('Connected to the MQTT broker');
});

exports.publishMessage = (topic , message) => {
    mqttClient.publish(topic, message, (err) => {
        if (err) {
            console.error('Error publishing MQTT message:', err);
        } else {
            console.log(`Published MQTT message on topic ${topic}: ${message}`);
        }
    });
};
