import User from '../models/User.js';
import Employee from '../models/Employee.js';
import generateToken from '../utils/generateToken.js';

export const login = async (req, res) => {
  const { email, password, role } = req.body;

  if (role === 'employee') {
    const employee = await Employee.findOne({ email });
    if (employee && await employee.matchPassword(password)) {
      return res.json({
        token: generateToken({ id: employee._id, role: 'employee' }),
        user: {
          id: employee._id,
          name: employee.name,
          email: employee.email,
          role: 'employee',
        },
      });
    }
  } else {
    const user = await User.findOne({ email });
    if (user && await user.matchPassword(password)) {
      return res.json({
        token: generateToken({ id: user._id, role: user.role }),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }
  }

  res.status(401).json({ message: 'Invalid credentials' });
};

export const getProfile = async (req, res) => {
  try {
    const user = await Employee.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load profile' });
  }
};
