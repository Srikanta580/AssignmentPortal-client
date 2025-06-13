// src/components/ActivityFeed.js
import React from "react";
import {
  FaUserCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaPlusCircle,
} from "react-icons/fa";

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      user: "Admin User",
      action: "approved",
      target: "Stanford University",
      time: "10 minutes ago",
      icon: <FaCheckCircle />,
      color: "var(--color-success)",
    },
    {
      id: 2,
      user: "System",
      action: "received",
      target: "new registration request",
      time: "25 minutes ago",
      icon: <FaPlusCircle />,
      color: "var(--color-secondary)",
    },
    {
      id: 3,
      user: "Admin User",
      action: "rejected",
      target: "XYZ College",
      time: "1 hour ago",
      icon: <FaTimesCircle />,
      color: "var(--color-error)",
    },
    {
      id: 4,
      user: "System",
      action: "updated",
      target: "Premium Plan features",
      time: "2 hours ago",
      icon: <FaPlusCircle />,
      color: "var(--color-secondary)",
    },
    {
      id: 5,
      user: "Admin User",
      action: "edited",
      target: "University of Tokyo settings",
      time: "3 hours ago",
      icon: <FaCheckCircle />,
      color: "var(--color-success)",
    },
  ];

  return (
    <div className="activity-feed">
      <h3 className="feed-title">Recent Activity</h3>
      <ul className="feed-list">
        {activities.map((activity) => (
          <li key={activity.id} className="feed-item">
            <div className="activity-icon" style={{ color: activity.color }}>
              {activity.icon}
            </div>
            <div className="activity-content">
              <p>
                <span className="activity-user">{activity.user}</span>{" "}
                {activity.action}{" "}
                <span className="activity-target">{activity.target}</span>
              </p>
              <small className="activity-time">{activity.time}</small>
            </div>
          </li>
        ))}
      </ul>
      <button className="btn outline-btn view-all-btn">
        View All Activity
      </button>
    </div>
  );
};

export default ActivityFeed;
