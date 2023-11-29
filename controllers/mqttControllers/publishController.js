const mqtt = require('mqtt');


const mqttClient = mqtt.connect('mqtt://34.200.138.102:1883');

mqttClient.on('connect', () => {
    console.log('Connected to the MQTT broker');
});

exports.publishMessage = (topic , message) => {
    mqttClient.publish("AustralFI/inel11/" + topic, message, (err) => {
        if (err) {
            console.error('Error publishing MQTT message:', err);
        } else {
            console.log(`Published MQTT message on topic AustralFI/inel11/${topic}: ${message}`);
        }
    });
};
