import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.scss";

const Sidebar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  console.log("location: ", location.pathname === "/device");

  return (
    <div className="sideBar-background">
      <div className="sideBar-container">
        <div
          className={`sideBar-item ${
            location.pathname === "/dashboard" ? "active" : ""
          }`}
        >
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <div
          className={`sideBar-item ${
            location.pathname === "/device" ? "active" : ""
          }`}
        >
          <Link to="/device">Device</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
