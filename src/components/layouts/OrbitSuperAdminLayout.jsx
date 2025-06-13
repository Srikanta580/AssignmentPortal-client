import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../pages/orbit_super_admin/Sidebar";
import Topbar from "../../pages/orbit_super_admin/Topbar";

function OrbitSuperAdminLayout() {
  return (
    <div className="app-container">
      <Sidebar />
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
