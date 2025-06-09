import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";
import LoginPage from "../pages/LoginPage";
import LoginForm from "../features/auth/LoginForm";
import RegisterForm from "../features/auth/RegisterForm";
import AdminRoutes from "./AdminRoutes";
import FacultyRoutes from "./FacultyRoutes";
import StudentRoutes from "./StudentRoutes";
import CodeAnalyzer from "../pages/CodeAnalyzer";
import FormPreview from "../pages/admin/forms/FormPreview";
import FormSubmissionPage from "../pages/FormSubmissionPage";
import LandingPage from "../pages/LandingPage";
import OrbitAuth from "../pages/OrbitAuth";
import OrbitAdminDashboard from "../pages/orbit_super_admin/Dashboard";
import UniversityAdminDashboard from "../pages/admin/UniversityAdminDashboard";
import NotFoundPage from "../pages/NotFoundPage";
// import Test from "../pages/test"; // Import the test page
const AppRoutes = () => {
  const { role } = useSelector((state) => state.auth); // Get logged-in user

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/orbit-admin" element={<OrbitAdminDashboard />} />
        <Route path="/auth" element={<OrbitAuth />} />
        <Route
          path="/:university-orbit-id/admin"
          element={<UniversityAdminDashboard />}
        />
        <Route path="/:university-orbit-id/login" element={<LoginPage />} />
        <Route
          path="/:university-orbit-id/login/:role"
          element={<LoginForm />}
        />
        <Route path="/register" element={<RegisterForm />} />
        {/* <Route path="/test" element={<Test/>} /> */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "faculty", "student"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {role === "admin" && (
            <Route path="admin/*" element={<AdminRoutes />} />
          )}
          {role === "faculty" && (
            <Route path="faculty/*" element={<FacultyRoutes />} />
          )}
          {role === "student" && (
            <Route path="student/*" element={<StudentRoutes />} />
          )}
          <Route path="*" element={<h1>Unauthorized or Page Not Found</h1>} />
        </Route>
        <Route path="/codeanalyzer" element={<CodeAnalyzer />} />
        <Route path="/form-preview" element={<FormPreview />} />
        <Route path="/form/:formId" element={<FormSubmissionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
