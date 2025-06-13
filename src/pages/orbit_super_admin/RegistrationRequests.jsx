// src/pages/RegistrationRequests.js
import React from "react";
import { FaCheck, FaTimes, FaInfoCircle, FaClock } from "react-icons/fa";
import RequestCard from "../../components/pages/orbit_super_admin/RequestCard";

const RegistrationRequests = ({ requests, onApprove }) => {
  const pendingRequests = requests.filter((req) => req.status === "pending");

  return (
    <div className="requests-page">
      <div className="page-header">
        <h1 className="page-title">University Registration Requests</h1>
        <div className="header-actions">
          <button className="btn export-btn">Export to CSV</button>
        </div>
      </div>

      <div className="filters">
        <div className="filter-tabs">
          <button className="filter-tab active">
            Pending <span className="badge">{pendingRequests.length}</span>
          </button>
          <button className="filter-tab">Approved</button>
          <button className="filter-tab">Rejected</button>
        </div>

        <div className="filter-controls">
          <select>
            <option>All Institutions</option>
            <option>Universities</option>
            <option>Colleges</option>
          </select>
          <input type="date" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="requests-grid">
        {pendingRequests.length > 0 ? (
          pendingRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onApprove={() => onApprove(request.id)}
            />
          ))
        ) : (
          <div className="empty-state">
            <FaInfoCircle className="empty-icon" />
            <h3>No Pending Requests</h3>
            <p>All registration requests have been processed.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationRequests;
