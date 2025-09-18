import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../features/task/taskSlice.js';
import { getEmployees } from '../features/employee/employeeSlice.js';
import { useNavigate } from 'react-router-dom';

export default function AddTaskPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    employeeId: '',
    dueDate: '',
  });

  //const { employees } = useSelector((state) => state.employee);

   const [message, setMessage] = useState(null);  // ✅ Success or error message
   const { employees, loading, error } = useSelector((state) => state.employee);

  useEffect(() => {
    dispatch(getEmployees());  // Load employee list
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch(addTask(formData)).then(() => navigate('/dashboard'));
      dispatch(addTask(formData))
      .unwrap()
      .then(() => {
        setMessage({ type: 'success', text: 'Task added successfully!' });
        setTimeout(() => {
          navigate('/task-list');
        }, 1500);
      })
      .catch((err) => {
        setMessage({ type: 'error', text: err || 'Failed to add task' });
      });
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Add Task</h1>

      {message && (
        <div
          className={`mb-4 p-2 rounded ${
            message.type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <select
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name} - {emp.department}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          Add Task
        </button>
      </form>
    </div>
  );
}
