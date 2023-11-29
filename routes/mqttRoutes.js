const mqtt = require('mqtt');
const mqttClient = mqtt.connect('mqtt://34.200.138.102:1883');
const subscribeController = require('../controllers/mqttControllers/subscribeController');

const topics = ['soldProducts' , 'machine/broke', 'machine/connected'];

mqttClient.on('connect', () => {
    console.log('Connected to the MQTT broker');

    topics.forEach(topic => {
        mqttClient.subscribe("AustralFI/inel11/03/" + topic, (err) => {
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
            case 'AustralFI/inel11/03/soldProducts':
                subscribeController.soldProduct(message);
                break;
            case 'AustralFI/inel11/03/machine/broke':
                subscribeController.machineBroken(message);
                break;
            case 'AustralFI/inel11/03/machine/connected':
                subscribeController.machineConnected(message);
                break;
            default:
                console.log('No topic match');
        }
});
