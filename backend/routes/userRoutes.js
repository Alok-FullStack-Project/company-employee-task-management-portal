import express from 'express';
import { addUser, getUsers,updateUser } from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/add', protect, isAdmin, addUser);
router.get('/', protect, isAdmin, getUsers);
router.put('/:id', protect, isAdmin, updateUser); // Update user by ID

export default router;
