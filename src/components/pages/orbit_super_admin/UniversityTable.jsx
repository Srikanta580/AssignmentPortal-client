// src/components/UniversityTable.js
import React from "react";
import { FaToggleOn, FaToggleOff, FaEdit, FaTrash } from "react-icons/fa";

const UniversityTable = ({ universities }) => {
  return (
    <div className="university-table">
      <table>
        <thead>
          <tr>
            <th>University Name</th>
            <th>Contact Email</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {universities.map((university) => (
            <tr key={university.id}>
              <td>
                <div className="university-info">
                  <div className="university-logo">
                    {university.logo ? (
                      <img src={university.logo} alt={university.name} />
                    ) : (
                      <div className="logo-placeholder">
                        {university.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <span>{university.name}</span>
                </div>
              </td>
              <td>{university.contactEmail}</td>
              <td>
                <span
                  className={`plan-badge ${
                    university?.plan?.toLowerCase() || "free"
                  }`}
                >
                  {university.plan || "Free"}
                </span>
              </td>
              <td>
                <span className={`status-badge ${university.status}`}>
                  {university.status}
                </span>
              </td>
              <td>
                <div className="table-actions">
                  <button className="icon-btn" title="Toggle Status">
                    {university.status === "active" ? (
                      <FaToggleOn />
                    ) : (
                      <FaToggleOff />
                    )}
                  </button>
                  <button className="icon-btn" title="Edit">
                    <FaEdit />
                  </button>
                  <button className="icon-btn" title="Delete">
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UniversityTable;
