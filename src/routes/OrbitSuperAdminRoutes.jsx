import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/orbit_super_admin/Dashboard";
import Universities from "../pages/orbit_super_admin/Universities";
import PlanManagement from "../pages/orbit_super_admin/PlanManagement";
import { useEffect, useState } from "react";
import RegistrationRequests from "../pages/orbit_super_admin/RegistrationRequests";
import { useDispatch, useSelector } from "react-redux";
import {
  approveUniversity,
  getAllUniversities,
} from "../features/university/universityAPI";

const OrbitSuperAdminRoutes = () => {
  const dispatch = useDispatch();
  const { allUniversities, recentRequests, pendingRequests } = useSelector(
    (state) => state.university
  );

  console.log("pending", pendingRequests);
  const [plans, setPlans] = useState([]);
  const [isInProgress, setInProgress] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllUniversities(null)).unwrap();
      } catch (error) {
        alert("Error loading data: " + error.message);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleApproveRequest = async (id) => {
    try {
      setInProgress(true);
      await dispatch(approveUniversity(id)).unwrap();
    } catch (error) {
      alert("Error approving request: " + error.message, "error");
    } finally {
      setInProgress(false);
    }
  };

  return (
    <Routes>
      <Route
        index
        element={
          <Dashboard
            requests={pendingRequests}
            universities={allUniversities}
            recentRequests={recentRequests}
          />
        }
      />
      <Route
        path="requests"
        element={
          <RegistrationRequests
            requests={pendingRequests}
            onApprove={handleApproveRequest}
            isInProgress={isInProgress}
          />
        }
      />
      <Route
        path="universities"
        element={<Universities universities={allUniversities} />}
      />
      <Route
        path="plans"
        element={<PlanManagement plans={plans} setPlans={setPlans} />}
      />
      {/* <Route path="/settings" element={<SystemSettings />} /> */}
    </Routes>
  );
};

export default OrbitSuperAdminRoutes;
