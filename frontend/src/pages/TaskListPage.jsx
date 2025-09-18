import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, updateTask } from '../features/task/taskSlice.js';
import { getEmployees } from '../features/employee/employeeSlice.js';
import { toast } from 'react-toastify';

export default function TaskListPage() {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const { employees } = useSelector((state) => state.employee);
  const { user } = useSelector((state) => state.auth);

  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    employeeId: '',
    dueDate: '',
    status: '',
  });

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getEmployees());
  }, [dispatch]);

  const displayedTasks = tasks.filter((task) => {
    if (user.role === 'admin') return true;
    if (user.role === 'manager') return task.managerId === user.id;
    if (user.role === 'employee') return task.employeeId === user.id;
    return false;
  });

  const openEditModal = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      employeeId: task.employee._id,
      dueDate: new Date(task.dueDate).toISOString().split('T')[0], // for input[type="date"]
      status: task.status,
    });
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTaskUpdate = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(updateTask({ taskId: editingTask._id, formData: formData }))
      .then((res) => {
        if (res.payload?.title) {
          toast.success('Task updated successfully');
          setEditingTask(null);
          dispatch(getTasks());
        } else {
          toast.error('Failed to update task');
        }
      })
      .catch(() => toast.error('Server error, please try again'));
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>

      {loading && <p>Loading tasks...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && tasks.length === 0 && <p>No tasks available.</p>}

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Assigned Employee</th>
            <th className="border p-2">Due Date</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className="hover:bg-gray-100">
              <td className="border p-2">{task.title}</td>
              <td className="border p-2">{task.description}</td>
              <td className="border p-2">{task.employee.name}</td>
              <td className="border p-2">{new Date(task.dueDate).toLocaleDateString()}</td>
              <td className="border p-2">{task.status}</td>
              <td className="border p-2">
                <button
                  className="bg-blue-600 text-white px-2 py-1 rounded"
                  onClick={() => openEditModal(task)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>

            <form onSubmit={handleTaskUpdate} className="space-y-4">
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
                required
                className="w-full p-2 border rounded"
              />

              <label>
                <span>Assign Employee</span>
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
              </label>

              <label>
                <span>Due Date</span>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </label>

              <label>
                <span>Status</span>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </label>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                  disabled={editingTask.status === 'completed'}
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => setEditingTask(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
