import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../pages/orbit_super_admin/Sidebar";
import Topbar from "../../pages/orbit_super_admin/Topbar";
import { useSelector } from "react-redux";

function OrbitSuperAdminLayout() {
  const pendingCount = useSelector(
    (state) => state.university.pendingRequests.length
  );
  return (
    <div className="app-container">
      <Sidebar pendingCount={pendingCount} />
      <div className="main-content">
        <Topbar />
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default OrbitSuperAdminLayout;
