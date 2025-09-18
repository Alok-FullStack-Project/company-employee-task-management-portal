import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeTasks } from '../features/task/taskSlice.js';
import TaskList from '../components/TaskList.jsx';
import { logout } from '../features/auth/authSlice.js';
import { useNavigate } from 'react-router-dom';

export default function EmployeeDashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, loading } = useSelector(state => state.tasks);

  useEffect(() => {
    dispatch(getEmployeeTasks());
  }, [dispatch]);


  const pending = tasks.filter(t => t.status === 'pending').length;
  const progress = tasks.filter(t => t.status === 'progress').length;
  const completed = tasks.filter(t => t.status === 'completed').length;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Employee Dashboard</h1>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-yellow-200 p-4 rounded">Pending: {pending}</div>
        <div className="bg-blue-200 p-4 rounded">In Progress: {progress}</div>
        <div className="bg-green-200 p-4 rounded">Completed: {completed}</div>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <TaskList tasks={tasks} />
      )}
    </div>
  );
}
