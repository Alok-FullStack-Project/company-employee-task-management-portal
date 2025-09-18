import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, roleAllowed = [] }) {
  const { token, user, loading } = useSelector((state) => state.auth);

  // Show a loading state while auth is initializing
  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  // If role is not allowed, redirect to login or unauthorized page
  if (roleAllowed.length && !roleAllowed.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  // All good → allow access
  return children;
}
