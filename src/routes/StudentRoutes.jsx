// AdminRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import StudentDashboard from "../pages/student/Dashboard";
import AssignmentLayout from "../components/layouts/AssignmentLayout";
import AssignmentPage from "../pages/student/Assignments";
import ProjectPage from "../pages/student/ProjectPage";

const StudentRoutes = () => (
  <Routes>
    <Route index element={<StudentDashboard />} />
    <Route path="assignments" element={<AssignmentLayout />}>
      <Route index element={<Navigate to="class" replace />} />
      <Route path=":type" element={<AssignmentPage />} />
    </Route>
    <Route path="minor-project" element={<ProjectPage />} />
    {/* <Route path="assignments" element={<AssignmentPage />} />
    <Route path="calendar" element={<CalendarPage />} />
    <Route path="notices" element={<NoticesPage />} />
    <Route path="profile" element={<ProfilePage />} /> */}
  </Routes>
);

export default StudentRoutes;
