import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./Component/Login";
import Register from "./Component/Register";
import Dashboard from "./Component/Dashboard";
import Appheader from "./Component/Appheader";

function App() {
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <Appheader />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/staffdashboard" element={<StaffDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} /> */}
      </Routes>
    </div>
  );
}

export default App;
