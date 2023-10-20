const express = require('express');
const router = express.Router();
const mqttController = require('../controllers/mqttController');

router.post('/mqttEndpoint', mqttController.mqttEndpoint);

module.exports = router;
