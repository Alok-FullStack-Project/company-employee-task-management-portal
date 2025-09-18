import express from 'express';
import { getEmployeeTasks ,addTask, getTasks, updateTaskStatus,updateTask } from '../controllers/taskController.js';
import { protect, isManagerOrAdmin, isEmployee,employeeOnly } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/add', protect, isManagerOrAdmin, addTask);
router.get('/', protect, isManagerOrAdmin, getTasks);
router.put('/:id/update-status', protect, isEmployee, updateTaskStatus);
router.put('/:id/update-task', protect, isManagerOrAdmin, updateTask);
router.get('/my-tasks', protect, isEmployee, getEmployeeTasks);

export default router;
