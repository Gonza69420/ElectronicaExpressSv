const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');

router.put('/refillMachine' , maintenanceController.refillMachine);
router.put('/workingInMachine' , maintenanceController.workingInMachine);
router.put('/machineReady' , maintenanceController.machineReady);


module.exports = router;