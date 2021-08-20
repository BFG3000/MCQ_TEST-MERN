import React from "react";
import Admin from "../../Components/Admin/AdminHome/Admin";
import Sidebar from "../../Components/Admin/Sidebar/Sidebar";
import "./Dashboard.css";

const Dashboard = ({ children }) => {
  console.log("dashboard");
  return (
    <div>
      <Sidebar />
      <div className="admin_content">{children}</div>
    </div>
  );
};

export default Dashboard;
