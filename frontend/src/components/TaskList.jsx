import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTaskStatus } from '../features/task/taskSlice.js';

export default function TaskList({ tasks }) {
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);

  const handleStatusChange = (taskId, newStatus) => {
    dispatch(updateTaskStatus({ taskId, status: newStatus }))
      .unwrap()
      .then(() => {
        setMessage({ type: 'success', text: 'Status updated successfully!' });
      })
      .catch((err) => {
        setMessage({ type: 'error', text: err || 'Failed to update status' });
      });
  };

  return (
    <div>
      {message && (
        <div
          className={`mb-4 p-2 rounded ${
            message.type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Title</th>
            <th className="border px-2 py-1">Description</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Due Date</th>
            <th className="border px-2 py-1">Completed Date</th>
            <th className="border px-2 py-1">Update Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task._id}>
              <td className="border px-2 py-1">{task.title}</td>
              <td className="border px-2 py-1">{task.description}</td>
              <td className="border px-2 py-1">{task.status}</td>
              <td className="border px-2 py-1">{new Date(task.dueDate).toLocaleDateString()}</td>
              <td className="border px-2 py-1">{task.completedDate ? new Date(task.completedDate).toLocaleDateString() : '-'}</td>
              <td className="border px-2 py-1">
                {task.status === 'completed' ? (
                  <span className="text-gray-500">Completed</span>
                ) : (
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                    className="border p-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
