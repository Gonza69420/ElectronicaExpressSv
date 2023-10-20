const mqtt = require('mqtt');
const mqttClient = mqtt.connect('mqtt://localhost:1883');

exports.mqttEndpoint = (req, res) => {
    // Lógica para manejar la comunicación MQTT
    mqttClient.publish('topic', 'mensaje');
    res.send('Mensaje MQTT publicado');
};
