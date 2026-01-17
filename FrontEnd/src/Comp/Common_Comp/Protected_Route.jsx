import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protected_Route = () => {
  const token = localStorage.getItem("token");

  // ❌ User not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ User logged in → allow access
  return <Outlet />;
};

export default Protected_Route;
