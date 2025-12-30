const Admin = require('../models/Admin');

module.exports = async function requireAdmin(req, res, next) {
  try {
    // Some routes set req.admin to an object, others to an id.
    const adminFromReq = req.admin;

    let adminDoc = null;
    if (!adminFromReq) {
      return res.status(401).json({ success: false, data: null, message: 'Not authenticated' });
    }

    if (typeof adminFromReq === 'string') {
      adminDoc = await Admin.findById(adminFromReq).select('-password');
    } else if (typeof adminFromReq === 'object' && adminFromReq._id) {
      adminDoc = adminFromReq;
    }

    if (!adminDoc) {
      return res.status(401).json({ success: false, data: null, message: 'Not authenticated' });
    }

    // Role gate (defaults to allow admin/superadmin)
    const role = adminDoc.role;
    if (role && !['admin', 'superadmin'].includes(role)) {
      return res.status(403).json({ success: false, data: null, message: 'Forbidden' });
    }

    req.admin = adminDoc;
    next();
  } catch (err) {
    next(err);
  }
};
