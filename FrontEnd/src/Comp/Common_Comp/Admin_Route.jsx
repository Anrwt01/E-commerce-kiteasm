import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Admin_Route = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Logged in but not admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // ✅ Admin verified → allow access
  return <Outlet />;
};

export default Admin_Route;
