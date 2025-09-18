import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/user/userSlice.js';
import { getEmployees } from '../features/employee/employeeSlice.js';
import { getTasks } from '../features/task/taskSlice.js';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const { employees } = useSelector((state) => state.employee);
  const { tasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (user.role === 'admin') {
      dispatch(getUsers());    // Admin sees all users
    }
    dispatch(getEmployees());  // Admin & Manager get employees
    dispatch(getTasks());      // Admin & Manager get tasks
  }, [dispatch, user.role]);

  let displayedEmployees = employees;
  let displayedTasks = tasks;

  if (user.role === 'manager') {
    // Manager sees only own employees and tasks
    displayedEmployees = employees.filter(emp => emp.managerId === user.id);
    displayedTasks = tasks.filter(task => displayedEmployees.some(e => e._id === task.employeeId));
  }

  const pending = tasks.filter(t => t.status === 'pending').length;
  const progress = tasks.filter(t => t.status === 'progress').length;
  const completed = tasks.filter(t => t.status === 'completed').length;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {user.role === 'admin' && (
        <div className="bg-blue-200 p-4 rounded shadow mb-6">
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-xl">{users.length}</p>
        </div>
      )}

      <div className="bg-green-200 p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold">Employees</h2>
        <p className="text-xl">{displayedEmployees.length}</p>
      </div>

      <div className="bg-yellow-200 p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Tasks</h2>
        <p>Pending: {pending}</p>
        <p>In Progress: {progress}</p>
        <p>Completed: {completed}</p>
      </div>
    </div>
  );
}
