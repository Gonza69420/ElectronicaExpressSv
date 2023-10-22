const express = require('express');
const router = express.Router();

module.exports = (mqttController) => {
    // Create a route for publishing MQTT messages
    router.post('/publish', mqttController.publishMessage);

    return router;
};
