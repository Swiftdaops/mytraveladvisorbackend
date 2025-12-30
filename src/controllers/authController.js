const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const signToken = (admin) => jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ success: false, data: null, message: 'Invalid credentials' });
    const match = await admin.matchPassword(password);
    if (!match) return res.status(401).json({ success: false, data: null, message: 'Invalid credentials' });
    const token = signToken(admin);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ success: true, data: { admin: { id: admin._id, email: admin.email, role: admin.role } }, message: 'Logged in successfully' });
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, data: null, message: 'Logged out' });
};
