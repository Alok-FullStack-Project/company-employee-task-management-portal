import User from '../models/User.js';

export const addUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({ name, email, password, role });
  res.status(201).json(user);
};

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    //user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    user.status = req.body.status || user.role;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
