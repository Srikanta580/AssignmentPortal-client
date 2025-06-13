import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../components/layouts/UniversityAdminDashboardLayout";
import DepartmentsPage from "../pages/admin/DepartmentPage";
import AdminsPage from "../pages/admin/AdminsPage";
import AnalyticsPage from "../pages/admin/AnalyticsPage";
import SettingsPage from "../pages/admin/UniversityAdminSettingsPage";

const UniversityAdminRoutes = () => {
  return (
    <Routes>
      <Route index element={<DepartmentsPage />} />
      <Route path="admins" element={<AdminsPage />} />
      <Route path="analytics" element={<AnalyticsPage />} />
      <Route path="settings" element={<SettingsPage />} />
    </Routes>
  );
};

export default UniversityAdminRoutes;
