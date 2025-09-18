import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../features/employee/employeeSlice.js';
import { useNavigate } from 'react-router-dom';

export default function AddEmployeePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
    position: '',
    salary: '',
    phone: '',
  });

  const [message, setMessage] = useState(null);  // ✅ Success or error message

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

      dispatch(addEmployee(formData))
      .unwrap()
      .then(() => {
        setMessage({ type: 'success', text: 'Employee added successfully!' });

        setTimeout(() => {
          navigate('/employee-list');
        }, 1500);
      })
      .catch((err) => {
        setMessage({ type: 'error', text: err || 'Failed to add employee' });
      })
    };


  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Add Employee</h1>

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
        {['name', 'email', 'password', 'department', 'position', 'salary', 'phone'].map(field => (
          <input
            key={field}
            type={field === 'password' ? 'password' : 'text'}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        ))}

        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Add Employee
        </button>
      </form>
    </div>
  );
}
