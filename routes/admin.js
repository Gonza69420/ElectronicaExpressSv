const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/addMachine', adminController.endpoint1);
router.delete('/deleteMachine', adminController.endpoint2);
router.get('/getIncome' , adminController.endpoint3);
router.get('/getAllMachines' , adminController.endpoint4);
router.post('/addMaintenanceStaff' , adminController.endpoint5);

module.exports = router;
