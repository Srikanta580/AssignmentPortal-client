// src/components/PlanCard.js
import React from "react";
import { FaToggleOn, FaToggleOff, FaTrash, FaEdit } from "react-icons/fa";

const PlanCard = ({ plan, onToggleStatus, onDelete }) => {
  return (
    <div className={`plan-card ${plan.isActive ? "active" : "inactive"}`}>
      <div className="plan-header">
        <h3>{plan.name}</h3>
        <div className="plan-actions">
          <button
            className="icon-btn"
            onClick={() => onToggleStatus(plan.id)}
            aria-label={plan.isActive ? "Deactivate plan" : "Activate plan"}
          >
            {plan.isActive ? <FaToggleOn /> : <FaToggleOff />}
          </button>
          <button
            className="icon-btn"
            onClick={() => onDelete(plan.id)}
            aria-label="Delete plan"
          >
            <FaTrash />
          </button>
          <button className="icon-btn" aria-label="Edit plan">
            <FaEdit />
          </button>
        </div>
      </div>

      <p className="plan-description">{plan.description}</p>

      <div className="plan-details">
        <div className="plan-price">
          <span>${plan.price}</span>
          <small>/month</small>
        </div>

        <div className="plan-status">
          <span
            className={`status-badge ${plan.isActive ? "active" : "inactive"}`}
          >
            {plan.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <div className="plan-modules">
        <h4>Included Modules:</h4>
        <ul>
          {plan.modules.map((module, index) => (
            <li key={index}>{module}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlanCard;
