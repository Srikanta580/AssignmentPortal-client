import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <main className="p-4">
          <Outlet /> {/* This will render different role-based views */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
