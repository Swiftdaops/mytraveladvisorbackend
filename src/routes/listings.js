const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const requireAdmin = require('../middlewares/requireAdmin');
const listingController = require('../controllers/listingController');

router.get('/', listingController.index);
router.get('/:id', listingController.show);
router.post('/', auth, requireAdmin, listingController.create);
router.put('/:id', auth, requireAdmin, listingController.update);
router.delete('/:id', auth, requireAdmin, listingController.remove);

module.exports = router;
