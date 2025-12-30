const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/auth');
const upload = require('../utils/multer');
const { uploadImages } = require('../controllers/uploadController');

router.post('/', protect, upload.array('images', 6), uploadImages);

module.exports = router;
