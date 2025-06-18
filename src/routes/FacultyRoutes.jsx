// AdminRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import FacultyDashboard from "../pages/faculty/Dashboard";
import AssignmentLayout from "../components/layouts/AssignmentLayout";
import AssignmentPage from "../pages/faculty/Assignments";
import ClassesPage from "../pages/faculty/Classes";
import NoticesPage from "../pages/faculty/Notices";
import CalendarPage from "../pages/faculty/Calendar";
import ProfilePage from "../pages/faculty/Profile";
import Attendance from "../pages/faculty/Attendance";
import AttendanceList from "../pages/faculty/AttendanceList";
import AssignmentSubmissionsPage from "../pages/faculty/AssignmentSubmissionsPage";
const FacultyRoutes = () => (
  <Routes>
    <Route index element={<FacultyDashboard />} />
    <Route path="assignments" element={<AssignmentLayout />}>
      <Route index element={<Navigate to="class" replace />} />
      <Route path=":type" element={<AssignmentPage />} />
      <Route path=":assignmentId/submissions" element={<AssignmentSubmissionsPage />} />
    </Route>
    <Route path="classes" element={<ClassesPage />} />
    <Route path="attendance" element={<Attendance />} />
    <Route path="attendance-list" element={<AttendanceList />} />
    <Route path="calendar" element={<CalendarPage />} />
    <Route path="notices" element={<NoticesPage />} />
    <Route path="profile" element={<ProfilePage />} />
    
  </Routes>
);

export default FacultyRoutes;
