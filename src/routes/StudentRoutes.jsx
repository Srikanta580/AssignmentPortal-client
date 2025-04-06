// AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import StudentDashboard from "../pages/student/Dashboard";

const StudentRoutes = () => (
  <Routes>
    <Route index element={<StudentDashboard />} />
    {/* <Route path="assignments" element={<AssignmentPage />} />
    <Route path="classes" element={<ClassesPage />} />
    <Route path="calendar" element={<CalendarPage />} />
    <Route path="notices" element={<NoticesPage />} />
    <Route path="profile" element={<ProfilePage />} /> */}
  </Routes>
);

export default StudentRoutes;
