import express from 'express';
import { addEmployee, getEmployees,updateEmployee } from '../controllers/employeeController.js';
import { protect, isManagerOrAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/add', protect, isManagerOrAdmin, addEmployee);
router.get('/', protect, isManagerOrAdmin, getEmployees);
router.put('/:id', protect, isManagerOrAdmin, updateEmployee);

export default router;
