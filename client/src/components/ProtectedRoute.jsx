import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    // Redirect to login page if user is not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render child component (e.g., Dashboard) if authenticated
  return children;
};