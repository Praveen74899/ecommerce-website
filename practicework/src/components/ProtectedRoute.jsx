// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
   
  const { token, role } = useAuth();

  // Check if the user is not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Check if the user's role is allowed to access the route
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in and has a valid role, show the child components
  return children;
};

export default ProtectedRoute;
