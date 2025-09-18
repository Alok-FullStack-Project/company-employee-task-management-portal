import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../api/axiosInstance.js';

export default function EmployeeProfilePage() {
  const { user, token } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("token" + token)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosInstance.get('/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) return <p className="p-4 text-center">Loading profile...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      <div className="bg-white shadow rounded p-4">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Department:</strong> {profile.department}</p>
        <p><strong>Position:</strong> {profile.position}</p>
        <p><strong>Salary:</strong> {profile.salary}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
      </div>
    </div>
  );
}
