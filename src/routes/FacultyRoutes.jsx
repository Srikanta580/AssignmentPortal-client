// AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import FacultyDashboard from "../pages/faculty/Dashboard";
import AssignmentPage from "../pages/faculty/Assignments";
import ClassesPage from "../pages/faculty/Classes";
import NoticesPage from "../pages/faculty/Notices";
import CalendarPage from "../pages/faculty/Calendar";
import ProfilePage from "../pages/faculty/Profile";

const FacultyRoutes = () => (
  <Routes>
    <Route index element={<FacultyDashboard />} />
    <Route path="assignments" element={<AssignmentPage />} />
    <Route path="classes" element={<ClassesPage />} />
    <Route path="calendar" element={<CalendarPage />} />
    <Route path="notices" element={<NoticesPage />} />
    <Route path="profile" element={<ProfilePage />} />
  </Routes>
);

export default FacultyRoutes;
