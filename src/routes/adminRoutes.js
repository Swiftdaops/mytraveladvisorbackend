const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

// Protected admin routes
router.get('/dashboard', auth, adminController.getDashboard);
router.get('/admins', auth, adminController.listAdmins);

module.exports = router;
