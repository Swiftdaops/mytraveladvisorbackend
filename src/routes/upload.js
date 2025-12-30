const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const uploadController = require('../controllers/uploadController');
const upload = require('../utils/multer');

router.post('/', auth, upload.array('images', 6), uploadController.uploadImages);

module.exports = router;
