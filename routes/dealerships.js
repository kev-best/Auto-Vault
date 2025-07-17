const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { listDealerships } = require('../controllers/dealerController');

// Route to list dealerships
router.get('/dealerships', auth, listDealerships);

module.exports = router;