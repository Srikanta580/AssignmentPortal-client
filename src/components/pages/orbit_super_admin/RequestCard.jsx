// src/components/RequestCard.js
import React, { useState } from "react";
import {
  FaUniversity,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaClock,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

const RequestCard = ({ request, onApprove, onReject, isInProgress }) => {
  const [approved, setApproved] = useState(false);
  return (
    <div className="request-card">
      <div className="request-header">
        <div className="university-icon">
          <FaUniversity />
        </div>
        <h3>{request.name}</h3>
        <span className={`status-badge ${request.status}`}>
          {request.status}
        </span>
      </div>

      <div className="request-body">
        <div className="request-details">
          <div className="detail-item">
            <FaEnvelope className="detail-icon" />
            <span>{request.contactEmail}</span>
          </div>
          <div className="detail-item">
            <FaPhone className="detail-icon" />
            <span>{request.contactPhone || "Not provided"}</span>
          </div>
          <div className="detail-item">
            <FaGlobe className="detail-icon" />
            <span>{request.website || "Not provided"}</span>
          </div>
          <div className="detail-item">
            <FaClock className="detail-icon" />
            <span>Submitted on {request.submittedDate}</span>
          </div>
        </div>

        <div className="request-description">
          <h4>Institution Description:</h4>
          <p>{request.description || "No description provided"}</p>
        </div>
      </div>

      {request.status === "pending" && (
        <div className="request-actions">
          <button
            className={`btn approve-btn ${
              isInProgress && "cursor-not-allowed"
            }`}
            disabled={isInProgress}
            onClick={() => onApprove(request.id)}
          >
            <FaCheck />{" "}
            {isInProgress ? "Approving" : approved ? "Approved" : "Approve"}
          </button>
          {!approved && (
            <button
              className="btn reject-btn"
              onClick={() => onReject(request.id)}
            >
              <FaTimes /> Reject
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default RequestCard;
