const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/auth');
const requireAdmin = require('../middlewares/requireAdmin');
const clientController = require('../controllers/clientController');

router.get('/', protect, requireAdmin, clientController.listClients);
router.get('/:id', protect, requireAdmin, clientController.getClient);

module.exports = router;
