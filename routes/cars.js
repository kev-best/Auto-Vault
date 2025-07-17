const express = require('express');
const router = express.Router();
const { search, getByVin } = require('../controllers/carController');

// Route to search vehicles
router.get('/search', search);  
// Route to get vehicle by VIN
router.get('/vin/:vin', getByVin);

module.exports = router;