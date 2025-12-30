exports.uploadImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, data: null, message: 'No files' });
    }

    // With multer-storage-cloudinary, files are already uploaded.
    const uploaded = req.files.map((f) => ({
      url: f.path,
      public_id: f.filename,
      originalname: f.originalname,
    }));

    res.json({ success: true, data: uploaded, message: 'Images uploaded' });
  } catch (err) {
    next(err);
  }
};
