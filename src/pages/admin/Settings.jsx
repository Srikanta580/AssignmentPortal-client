import React, { useState } from "react";
import apiClient from "../../services/apiClient";

function SettingsPage() {
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    try {
      const response = await apiClient.get("/");
      setMessage(response.data);
    } catch (error) {
      setMessage("API call failed!");
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      SettingsPage
      <br />
      <button onClick={handleClick}>Test API</button>
      <p>{message}</p>
    </div>
  );
}

export default SettingsPage;
