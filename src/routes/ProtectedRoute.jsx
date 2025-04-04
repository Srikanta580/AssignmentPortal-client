import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = useSelector((state) => state.auth.user); // Get user from Redux state
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated || !allowedRoles.includes(user?.role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
