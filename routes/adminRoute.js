const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
import {authenticateJWT} from "../JWT/protectRoutes";

router.use(authenticateJWT("admin")); //MiddleWare

router.post('/addMachine', adminController.addMachine);

router.delete('/deleteMachine/:machineId', adminController.deleteMachine);

router.get('/getIncome/:machineId' , adminController.getIncome);

router.get('/getAllMachines' , adminController.getAllMachines);

router.post('/addMaintenanceStaff' , adminController.addMaintenanceStaff);

router.delete('/deleteMaintenanceStaff/:maintenanceId' , adminController.deleteMaintenanceStaff);

router.get('/getMachine/:machineId' , adminController.getMachine);

router.get('/getTotalIncome' , adminController.getTotalIncome);

router.put('/adjustPrice/:productId' , adminController.adjustProductPrice);

router.post('/addProduct' , adminController.addProduct);

router.delete('/deleteProduct/:productId' , adminController.deleteProduct);

router.get('/getProduct/:productId' , adminController.getProduct);

router.get('/getAllProducts' , adminController.getAllProducts);

router.get('/getMaintenanceStaff/:maintenanceId' , adminController.getMaintenanceStaff);

router.get('/allMaintenanceStaff' , adminController.allMaintenanceStaff);

module.exports = router;
