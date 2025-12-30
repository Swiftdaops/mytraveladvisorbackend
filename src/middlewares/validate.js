module.exports = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      data: err.errors || null,
      message: 'Validation failed',
    });
  }
};
