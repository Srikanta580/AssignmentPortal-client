// src/components/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUniversity,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import Logo from "../../components/atoms/Logo";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <Logo />
          <h1>Super Admin</h1>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="dashboard"
          end
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <FaHome className="nav-icon" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="dashboard/requests"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <FaClipboardList className="nav-icon" />
          <span>Registration Requests</span>
          <span className="badge">12</span>
        </NavLink>

        <NavLink
          to="dashboard/universities"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <FaUniversity className="nav-icon" />
          <span>Universities</span>
        </NavLink>

        <NavLink
          to="dashboard/plans"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <FaClipboardList className="nav-icon" />
          <span>Plan Management</span>
        </NavLink>

        <NavLink
          to="dashboard/settings"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <FaCog className="nav-icon" />
          <span>System Settings</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="nav-item">
          <FaSignOutAlt className="nav-icon" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
