// src/pages/Dashboard.js
import React from "react";
import {
  FaUniversity,
  FaClipboardList,
  FaCheckCircle,
  FaChartBar,
} from "react-icons/fa";
import StatCard from "../../components/ui/StatCard";
import ActivityFeed from "../../components/pages/orbit_super_admin/ActivityFeed";
import RecentRequests from "../../components/pages/orbit_super_admin/RecentRequests";

const Dashboard = ({ requests, universities }) => {
  const pendingRequests = requests?.filter(
    (req) => req.status === "pending"
  ).length;
  const approvedUniversities = universities?.filter(
    (uni) => uni.status === "active"
  ).length;

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Dashboard Overview</h1>

      <div className="stats-grid">
        <StatCard
          icon={<FaClipboardList />}
          title="Pending Requests"
          value={pendingRequests}
          color="var(--color-secondary)"
        />
        <StatCard
          icon={<FaUniversity />}
          title="Active Universities"
          value={approvedUniversities}
          color="var(--color-primary)"
        />
        <StatCard
          icon={<FaCheckCircle />}
          title="Verified Institutions"
          value="42"
          color="var(--color-accent)"
        />
        <StatCard
          icon={<FaChartBar />}
          title="Monthly Growth"
          value="+18%"
          color="#9c27b0"
        />
      </div>

      <div className="dashboard-content">
        <div className="dashboard-column">
          <RecentRequests requests={requests?.slice(0, 5)} />
        </div>

        <div className="dashboard-column">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
