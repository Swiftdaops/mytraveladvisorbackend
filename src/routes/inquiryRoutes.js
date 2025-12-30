const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const inquiryValidation = require('../utils/validation/inquirySchema');
const inquiryController = require('../controllers/inquiryController');

router.post('/', validate(inquiryValidation), inquiryController.createInquiry);
router.get('/', protect, inquiryController.getInquiries);
router.patch('/:id', protect, inquiryController.updateInquiryStatus);

module.exports = router;
