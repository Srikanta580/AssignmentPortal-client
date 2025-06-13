// src/components/RecentRequests.js
import React from "react";
import { FaClock, FaUniversity } from "react-icons/fa";

const RecentRequests = ({ requests }) => {
  return (
    <div className="recent-requests">
      <h3 className="requests-title">Recent Registration Requests</h3>

      {requests?.length > 0 ? (
        <ul className="requests-list">
          {requests.map((request) => (
            <li key={request.id} className="request-item">
              <div className="request-icon">
                <FaUniversity />
              </div>
              <div className="request-content">
                <h4>{request.universityName}</h4>
                <p>{request.contactEmail}</p>
                <div className="request-meta">
                  <span className="request-date">
                    <FaClock /> {request.submittedDate}
                  </span>
                  <span className={`request-status ${request.status}`}>
                    {request.status}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-requests">
          <p>No recent registration requests</p>
        </div>
      )}

      <button className="btn outline-btn view-all-btn">
        View All Requests
      </button>
    </div>
  );
};

export default RecentRequests;
