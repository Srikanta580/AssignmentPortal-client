import React from "react";
import UDModal from "../../components/modals/UDModal";
import { useNavigate } from "react-router-dom";

function AnalyticsPage() {
  const navigate = useNavigate();
  const navigationRoute = () => {
    navigate("..");
  };
  return <UDModal isOpen={true} onClose={navigationRoute} />;
}

export default AnalyticsPage;
