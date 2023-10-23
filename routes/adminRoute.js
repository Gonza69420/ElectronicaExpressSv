const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/addMachine', adminController.addMachine);
router.delete('/deleteMachine/:machineId', adminController.deleteMachine);
router.get('/getIncome/:machineId' , adminController.getIncome);
router.get('/getAllMachines' , adminController.getAllMachines);
router.post('/addMaintenanceStaff' , adminController.addMaintenanceStaff);
router.post('/deleteMaintenanceStaff/:maintenanceId' , adminController.deleteMaintenanceStaff);
router.get('/getMachine/:machineId' , adminController.getMachine);
router.get('/getTotalIncome' , adminController.getTotalIncome);
module.exports = router;
