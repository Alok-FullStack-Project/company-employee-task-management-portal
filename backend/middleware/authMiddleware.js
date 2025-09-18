import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Employee from '../models/Employee.js';

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if (!token) throw new Error('Not authorized');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    if (decoded.role === 'employee') {
      req.user = await Employee.findById(decoded.id).select('-password');
    } else {
      req.user = await User.findById(decoded.id).select('-password');
    }

    if (!req.user) throw new Error('User not found');

    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only.' });
  next();
};

export const isManagerOrAdmin = (req, res, next) => {
  if (['admin', 'manager'].includes(req.user.role)) return next();
  return res.status(403).json({ message: 'Manager or Admin only' });
};

export const isEmployee = (req, res, next) => {
  if (req.user.managerId) return next();
  return res.status(403).json({ message: 'Employee only' });
};

export const employeeOnly = (req, res, next) => {
  if (req.user.role !== 'employee') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};
