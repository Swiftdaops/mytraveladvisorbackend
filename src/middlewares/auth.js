const jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ success: false, data: null, message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ success: false, data: null, message: 'Token failed' });
  }
};
