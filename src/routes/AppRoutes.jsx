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
import UniversityAdminRoutes from "./UniversityAdminRoutes";
import CodeAnalyzer from "../pages/CodeAnalyzer";
import FormPreview from "../pages/admin/forms/FormPreview";
import FormSubmissionPage from "../pages/FormSubmissionPage";
import LandingPage from "../pages/LandingPage";
import OrbitSuperAdminRoutes from "../routes/OrbitSuperAdminRoutes";
import UniversityAdminDashboardLayout from "../components/layouts/UniversityAdminDashboardLayout";
import NotFoundPage from "../pages/NotFoundPage";
import OrbitSuperAdminLayout from "../components/layouts/OrbitSuperAdminLayout";
import OrbitUniversityLoginPage from "../pages/OrbitUniversityLogin";
import OrbitUniversityRegisterPage from "../pages/OrbitUniversityReg";
import PaymentResultPage from "../pages/PaymentResultPage";
import PricingPage from "../pages/PricingPage";
import ContactSalesPage from "../pages/ContactSalesPage";
import FreeTierSuccessPage from "../pages/FreeTierSuccess";
// import Test from "../pages/test"; // Import the test page
const AppRoutes = () => {
  const { role } = useSelector((state) => state.auth); // Get logged-in user

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/orbit-admin" element={<OrbitSuperAdminLayout />}>
          <Route path="dashboard/*" element={<OrbitSuperAdminRoutes />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/auth" element={<OrbitUniversityLoginPage />} />
        <Route
          path="/university-reg"
          element={<OrbitUniversityRegisterPage />}
        />
        <Route
          path="/:university"
          element={
            <ProtectedRoute allowedRoles={["univadmin"]}>
              <UniversityAdminDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="admin/*" element={<UniversityAdminRoutes />} />
        </Route>
        <Route
          path="/pricing"
          element={
            <ProtectedRoute allowedRoles={["univadmin"]}>
              <PricingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment-result"
          element={
            <ProtectedRoute allowedRoles={["univadmin"]}>
              <PaymentResultPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/free-tier-success"
          element={
            <ProtectedRoute allowedRoles={["univadmin"]}>
              <FreeTierSuccessPage />
            </ProtectedRoute>
          }
        />
        <Route path="/contact-sales" element={<ContactSalesPage />} />
        <Route path="/:university-slug/login" element={<LoginPage />} />
        <Route path="/:university-slug/login/:role" element={<LoginForm />} />
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
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
