const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');
const adminController = require('../controllers/adminController');
const {authenticateJWT} = require("../JWT/protectRoutes");

router.use(authenticateJWT("maintenance")); //MiddleWare

router.put('/refillMachine/:machineId' , maintenanceController.refillMachine);
router.put('/workingInMachine/:machineId' , maintenanceController.workingInMachine);
router.put('/machineReady/:machineId' , maintenanceController.machineReady);
router.get('/getMachine/:machineId' , adminController.getMachine);
router.get('/getAllMachines' , adminController.getAllMachines);
router.get('/getProduct/:productId' , adminController.getProduct);
router.get('/getAllProducts' , adminController.getAllProducts);

module.exports = router;