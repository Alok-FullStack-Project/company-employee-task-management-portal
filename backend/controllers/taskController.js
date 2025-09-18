import Task from '../models/Task.js';

export const addTask = async (req, res) => {
  const { title, description, employeeId, dueDate } = req.body;
  const manager = req.user._id;

  const task = await Task.create({
    title, description, employee: employeeId, manager, dueDate
  });

  res.status(201).json(task);
};

export const getTasks = async (req, res) => {
  let tasks;

  if (req.user.role === 'admin') {
    // Admin gets all tasks
    tasks = await Task.find().populate('employee', 'name department');
  } else if (req.user.role === 'manager') {
    // Manager gets only tasks assigned to own employees
    // First, get manager's employees
   // const employees = await Employee.find({ managerId: req.user._id }).select('_id');

    //const employeeIds = employees.map(emp => emp._id);

    tasks = await Task.find({ manager: req.user._id }).populate('employee', 'name department');
  } else {
    return res.status(403).json({ message: 'Access denied' });
  }

  res.json(tasks);
};


export const updateTaskStatus = async (req, res) => {
  const taskId = req.params.id;  
  const {  status } = req.body;
  const task = await Task.findById(taskId);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  task.status = status;
  if (status === 'completed') {
    task.completedDate = new Date();
  }

  await task.save();
  res.json(task);
};

export const updateTask = async (req, res) => {
  const taskId = req.params.id;  
  const {  title,description,employeeId,dueDate,status } = req.body;
  const task = await Task.findById(taskId);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  task.status = status;
  if (status === 'completed') {
    task.completedDate = new Date();
  }
  task.title = title;
  task.description = description;
  task.employee = employeeId;
  task.dueDate = dueDate;
  task.status = status;

  await task.save();
  res.json(task);
};



export const getEmployeeTasks = async (req, res) => {
  try {
    const employeeId = req.user._id;  // Auth middleware provides req.user

    const tasks = await Task.find({ employee :  employeeId})
      .populate('employee', 'name department');  // Populate employee name & department

    res.json(tasks.map(task => ({
      _id: task._id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      completedDate: task.completedDate,
      status: task.status,
      employeeId: task.employee._id,
      employeeName: task.employee.name,
      employeeDepartment: task.employee.department,
    })));
  } catch (error) {
    console.error('Error fetching employee tasks:', error);
    res.status(500).json({ message: 'Failed to fetch employee tasks' });
  }
};


