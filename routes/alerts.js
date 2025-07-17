const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createAlert, listAlerts } = require('../controllers/alertController');

router.post('/alerts', auth, createAlert);
router.get('/alerts', auth, listAlerts);

module.exports = router;