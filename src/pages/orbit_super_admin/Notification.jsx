// src/components/Notification.js
import React from "react";
import { FaCheckCircle, FaTimesCircle, FaTimes } from "react-icons/fa";

const Notification = ({ message, type, onClose }) => {
  const getIcon = () => {
    if (type === "success") return <FaCheckCircle />;
    if (type === "error") return <FaTimesCircle />;
    return null;
  };

  return (
    <div className={`notification ${type}`}>
      <div className="notification-icon">{getIcon()}</div>
      <div className="notification-content">
        <p>{message}</p>
      </div>
      <button className="notification-close" onClick={onClose}>
        <FaTimes />
      </button>
    </div>
  );
};

export default Notification;
