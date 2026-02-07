import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protected_Route = ({ adminOnly }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // ❌ User not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 🛡️ Admin protection logic
  if (adminOnly && user.role !== "admin") {
    // If user tries to access admin routes but isn't an admin, redirect to user dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ Authorized → allow access
  return <Outlet />;
};

export default Protected_Route;
