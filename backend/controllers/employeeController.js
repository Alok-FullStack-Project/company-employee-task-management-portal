import Employee from '../models/Employee.js';

export const addEmployee = async (req, res) => {
  const { name, email, password, department, position, salary, phone } = req.body;
  const managerId = req.user._id;

  const employee = await Employee.create({
    name, email, password, department, position, salary, phone, managerId
  });

  res.status(201).json(employee);
};

export const getEmployees = async (req, res) => {
  let employees;

  if (req.user.role === 'admin') {
    // Admin gets all employees
    employees = await Employee.find();
  } else if (req.user.role === 'manager') {
    // Manager gets only own employees
    employees = await Employee.find({ managerId: req.user._id });
  } else {
    return res.status(403).json({ message: 'Access denied' });
  }

  res.json(employees);
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, department, position, salary, phone, status } = req.body;

  try {
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Optional: Validate that a manager can only update their own employees
    if (req.user.role === 'manager' && employee.managerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this employee' });
    }

    // Update fields
    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.department = department || employee.department;
    employee.position = position || employee.position;
    employee.salary = salary || employee.salary;
    employee.phone = phone || employee.phone;
    employee.status = status || employee.status;

    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
  } catch (error) {
    console.error('Update Employee Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
