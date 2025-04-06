// AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/admin/Dashboard";
import UsersPage from "../pages/admin/Users";
import CoursesPage from "../pages/admin/Courses";
import AnalyticsPage from "../pages/admin/Analytics";
import SettingsPage from "../pages/admin/Settings";
import NotificationsPage from "../pages/admin/Notifications";

const AdminRoutes = () => (
  <Routes>
    <Route index element={<AdminDashboard />} />
    <Route path="users" element={<UsersPage />} />
    <Route path="courses" element={<CoursesPage />} />
    <Route path="analytics" element={<AnalyticsPage />} />
    <Route path="settings" element={<SettingsPage />} />
    <Route path="notifications" element={<NotificationsPage />} />
  </Routes>
);

export default AdminRoutes;
