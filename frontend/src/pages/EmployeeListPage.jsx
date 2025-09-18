import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees, updateEmployee } from '../features/employee/employeeSlice.js';
import { toast } from 'react-toastify';

export default function EmployeeListPage() {
  const dispatch = useDispatch();
  const { employees, loading } = useSelector(state => state.employee);

  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    position: '',
    phone: '',
    salary: '',
  });

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  const openEditModal = (emp) => {
    setEditingEmployee(emp);
    setFormData({
      name: emp.name,
      email: emp.email,
      department: emp.department,
      position: emp.position,
      phone: emp.phone,
      salary: emp.salary,
    });
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

 const handleUpdate = (e) => {
  e.preventDefault();
  dispatch(updateEmployee({ id: editingEmployee._id, data: formData }))
    .then((res) => {
      if (res.payload?.name) {
        toast.success('Employee updated successfully');
        setEditingEmployee(null);
        dispatch(getEmployees());  // Refresh employee list
      } else {
        toast.error('Failed to update employee');
      }
    })
    .catch(() => toast.error('Server error, please try again'));
};
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Employee List</h1>

      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Department</th>
              <th className="border px-2 py-1">Position</th>
              <th className="border px-2 py-1">Phone</th>
              <th className="border px-2 py-1">Salary</th>
              <th className="border px-2 py-1">Manager ID</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp._id}>
                <td className="border px-2 py-1">{emp.name}</td>
                <td className="border px-2 py-1">{emp.email}</td>
                <td className="border px-2 py-1">{emp.department}</td>
                <td className="border px-2 py-1">{emp.position}</td>
                <td className="border px-2 py-1">{emp.phone}</td>
                <td className="border px-2 py-1">{emp.salary}</td>
                <td className="border px-2 py-1">{emp.managerId}</td>
                <td className="border px-2 py-1">
                  <button
                    className="bg-blue-600 text-white px-2 py-1 rounded"
                    onClick={() => openEditModal(emp)}
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
      {editingEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Edit Employee</h2>

            <form onSubmit={handleUpdate} className="space-y-4">
              {['name', 'email', 'department', 'position', 'phone', 'salary'].map(field => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
              ))}

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
                  onClick={() => setEditingEmployee(null)}
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
