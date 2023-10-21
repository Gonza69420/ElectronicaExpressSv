const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/endpoint1', apiController.endpoint1);
router.post('/endpoint2', apiController.endpoint2);

module.exports = router;
