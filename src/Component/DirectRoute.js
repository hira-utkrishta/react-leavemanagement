import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StaffDashboard from "./StaffDashboard";
import AdminDashboard from "./AdminDashboard";

const DirectRoute = () => {
  const [data, setData] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const storedloggedin = JSON.parse(localStorage.getItem("loggedInUser"));
    console.log(storedloggedin);
    setData(storedloggedin);
    if (!storedloggedin) {
      navigate("/login");
    }
  }, []);
  console.log(data);

  return <>{data.role === "Staff" ? <StaffDashboard /> : <AdminDashboard />}</>;
};

export default DirectRoute;
