const express = require('express');
const router = express.Router();
const mqttController = require('../controllers/mqttController');

router.post('/mqttEndpoint', mqttController.mqttEndpoint);
router.post('/publish', mqttController.publishMessage);
router.post('/subscribe', mqttController.subscribeTopic);


module.exports = router;
