const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/auth');
const requireAdmin = require('../middlewares/requireAdmin');
const validate = require('../middlewares/validate');
const tripValidation = require('../utils/validation/tripSchema');
const tripController = require('../controllers/tripController');

router.get('/', tripController.getTrips);
router.post('/', protect, requireAdmin, validate(tripValidation), tripController.createTrip);
router.put('/:id', protect, requireAdmin, validate(tripValidation.partial()), tripController.updateTrip);
router.delete('/:id', protect, requireAdmin, tripController.deleteTrip);

module.exports = router;
