// AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/admin/Dashboard";
import UsersPage from "../pages/admin/Users";
import SubjectsPage from "../pages/admin/Subjects";
import AnalyticsPage from "../pages/admin/Analytics";
import SettingsPage from "../pages/admin/Settings";
import NotificationsPage from "../pages/admin/Notifications";
import Classes from "../pages/admin/Classes";
import FormsPage from "../pages/admin/forms/Forms";
import CreateForm from "../pages/admin/forms/CreateForm";
import FormResponses from "../pages/admin/forms/FormResponse";

const AdminRoutes = () => (
  <Routes>
    <Route index element={<AdminDashboard />} />
    <Route path="users" element={<UsersPage />} />
    <Route path="classes" element={<Classes />} />
    <Route path="forms" element={<FormsPage />} />
    <Route path="forms/create" element={<CreateForm />} />
    <Route path="forms/:formId" element={<FormResponses />} />
    <Route path="subjects" element={<SubjectsPage />} />
    <Route path="analytics" element={<AnalyticsPage />} />
    <Route path="settings" element={<SettingsPage />} />
    <Route path="notifications" element={<NotificationsPage />} />
  </Routes>
);

export default AdminRoutes;
