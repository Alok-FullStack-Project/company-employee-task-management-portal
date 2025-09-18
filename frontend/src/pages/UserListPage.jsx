import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, updateUser } from '../features/user/userSlice.js';

export default function UserListPage() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector(state => state.user);

  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: '',status : '' });

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role, status : user.status });
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id: editingUser._id, data: formData }))
      .then(() => {
        setEditingUser(null);
       // dispatch(getUsers());  // Refresh user list
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">User List</h1>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Role</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td className="border px-2 py-1">{user.name}</td>
                <td className="border px-2 py-1">{user.email}</td>
                <td className="border px-2 py-1">{user.role}</td>
                <td className="border px-2 py-1">{user.status}</td>
                <td className="border px-2 py-1">
                  <button
                    className="bg-blue-600 text-white px-2 py-1 rounded"
                    onClick={() => openEditModal(user)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>

            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
                disabled="true"
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              >
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              >
                <option value="active">Active</option>
                <option value="inactive">InActive</option>
              </select>


              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => setEditingUser(null)}
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
