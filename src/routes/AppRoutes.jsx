import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminDashboard from "../pages/admin/Dashboard";
import FacultyDashboard from "../pages/faculty/Dashboard";
import StudentDashboard from "../pages/student/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import LoginForm from "../features/auth/LoginForm";
import RegisterForm from "../features/auth/RegisterForm";

const AppRoutes = () => {
  const user = useSelector((state) => state.auth.user); // Get logged-in user

  // Dynamically set dashboard component based on role
  const getDashboardComponent = () => {
    switch (user?.role) {
      case "admin":
        return <AdminDashboard />;
      case "faculty":
        return <FacultyDashboard />;
      case "student":
        return <StudentDashboard />;
      default:
        return <h1>Unauthorized</h1>;
    }
  };

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
          <Route index element={getDashboardComponent()} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
