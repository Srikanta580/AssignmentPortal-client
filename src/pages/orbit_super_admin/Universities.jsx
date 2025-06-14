// src/pages/Universities.js
import React, { useState } from "react";
import {
  FaSearch,
  FaUniversity,
  FaEdit,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import UniversityTable from "../../components/pages/orbit_super_admin/UniversityTable";

const Universities = ({ universities }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUniversities = universities.filter(
    (uni) =>
      uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uni.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="universities-page">
      <div className="page-header">
        <h1 className="page-title">Universities Management</h1>
        <div className="header-actions">
          <button className="btn primary-btn">Add New University</button>
        </div>
      </div>

      <div className="controls">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search universities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-options">
          <select>
            <option>All Status</option>
            <option>Active</option>
            <option>Suspended</option>
          </select>
          <select>
            <option>All Plans</option>
            <option>Basic</option>
            <option>Premium</option>
            <option>Enterprise</option>
          </select>
        </div>
      </div>

      <UniversityTable universities={filteredUniversities} />
    </div>
  );
};

export default Universities;
