import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, role } = useSelector((state) => state.auth); // Get user from Redux state

  console.log(user, isAuthenticated, role);

  if (!isAuthenticated || !allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
