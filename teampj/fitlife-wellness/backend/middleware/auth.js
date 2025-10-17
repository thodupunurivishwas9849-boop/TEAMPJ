const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Admin = require('../models/admin.model');

// Middleware to authenticate user
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Token is not valid. User not found.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid.' });
  }
};

// Middleware to authenticate admin
const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({ message: 'Token is not valid. Admin not found.' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid.' });
  }
};

module.exports = {
  authenticateUser,
  authenticateAdmin
};
