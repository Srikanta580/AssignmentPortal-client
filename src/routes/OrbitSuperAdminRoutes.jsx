import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/orbit_super_admin/Dashboard";
import Universities from "../pages/orbit_super_admin/Universities";
import PlanManagement from "../pages/orbit_super_admin/PlanManagement";
import { useEffect, useState } from "react";
import RegistrationRequests from "../pages/orbit_super_admin/RegistrationRequests";

const OrbitSuperAdminRoutes = () => {
  const [requests, setRequests] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [plans, setPlans] = useState([]);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      try {
        // const reqs = await getRegistrationRequests();
        // setRequests(reqs);
        // const unis = await getUniversities();
        // setUniversities(unis);
        // const planData = await getPlanModules();
        // setPlans(planData);
      } catch (error) {
        showNotification("Error loading data: " + error.message, "error");
      }
    };

    fetchData();
  }, []);

  const handleApproveRequest = async (id) => {
    try {
      //   const updatedReq = await approveRequest(id);
      //   setRequests(requests.map(req => req.id === id ? updatedReq : req));
      showNotification("University approved successfully!", "success");
    } catch (error) {
      showNotification("Error approving request: " + error.message, "error");
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ ...notification, show: false }), 3000);
  };

  return (
    <Routes>
      <Route
        index
        element={<Dashboard requests={requests} universities={universities} />}
      />
      <Route
        path="requests"
        element={
          <RegistrationRequests
            requests={requests}
            onApprove={handleApproveRequest}
          />
        }
      />
      <Route
        path="universities"
        element={<Universities universities={universities} />}
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
