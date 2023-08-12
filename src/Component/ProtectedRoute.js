import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  console.log(allowedRoles);
  const StoredUser = JSON.parse(localStorage.getItem("loggedInUser"));
  let auth = { role: StoredUser.role };
  return (
    <div>
      {auth.role === allowedRoles ? children : <Navigate to="/login" replace />}
    </div>
  );
}

export default ProtectedRoute;
