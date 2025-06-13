// src/components/Topbar.js
import React, { useState } from "react";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

const Topbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="topbar">
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="topbar-right">
        <div className="notification-icon">
          <FaBell />
          <span className="notification-badge">3</span>
        </div>

        <div className="user-profile">
          <FaUserCircle className="user-avatar" />
          <div className="user-info">
            <span className="user-name">Super Admin</span>
            <span className="user-role">Administrator</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
