import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // If a token exists, the user is logged in. 
  // Redirect them away from Login/Register/Home.
  if (token) {
    // Redirect admins to admin dashboard, users to products
    return role === "admin" 
      ? <Navigate to="/admin/dashboard" replace /> 
      : <Navigate to="/products" replace />;
  }

  // If no token, allow them to see the page (Login/Register/Home)
  return children;
};

export default PublicRoute;
