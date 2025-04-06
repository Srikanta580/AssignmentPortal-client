import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import LoginForm from "../features/auth/LoginForm";
import RegisterForm from "../features/auth/RegisterForm";
import AdminRoutes from "./AdminRoutes";
import FacultyRoutes from "./FacultyRoutes";
import StudentRoutes from "./StudentRoutes";

const AppRoutes = () => {
  const user = useSelector((state) => state.auth.user); // Get logged-in user

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/:role" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "faculty", "student"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {user?.role === "admin" && (
            <Route path="admin/*" element={<AdminRoutes />} />
          )}
          {user?.role === "faculty" && (
            <Route path="faculty/*" element={<FacultyRoutes />} />
          )}
          {user?.role === "student" && (
            <Route path="student/*" element={<StudentRoutes />} />
          )}
          <Route path="*" element={<h1>Unauthorized or Page Not Found</h1>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
