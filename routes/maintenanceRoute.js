const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');
import {authenticateJWT} from "../JWT/protectRoutes";

router.use(authenticateJWT("maintenance")); //MiddleWare

router.put('/refillMachine/:machineId' , maintenanceController.refillMachine);
router.put('/workingInMachine/:machineId' , maintenanceController.workingInMachine);
router.put('/machineReady/:machineId' , maintenanceController.machineReady);


module.exports = router;