const mqtt = require('mqtt');
const mqttClient = mqtt.connect('mqtt://localhost:1883');
const subscribeController = require('../controllers/mqttControllers/subscribeController');

const topics = ['soldProduct' , 'machine/broke', 'machine/connected'];

mqttClient.on('connect', () => {
    console.log('Connected to the MQTT broker');

    topics.forEach(topic => {
        mqttClient.subscribe("AustralFI/inel11/" + topic, (err) => {
            if (err) {
                console.error(`Error subscribing to topic ${topic}: ${err}`);
            } else {
                console.log(`Subscribed to topic ${topic}`);
            }
        });
    })
});


mqttClient.on('message' , (topic , message) => {
        console.log(`Received message on topic ${topic}: ${message}`);

        switch (topic) {
            case 'AustralFI/inel11/soldProduct':
                subscribeController.soldProduct(message);
                break;
            case 'AustralFI/inel11/machine/broke':
                subscribeController.machineBroken(message);
                break;
            case 'AustralFI/inel11/machine/Connected':
                subscribeController.machineConnected(message);
                break;
            default:
                console.log('No topic match');
        }
});