module.exports = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ success: false, data: null, message: err.message || 'Server error' });
};
