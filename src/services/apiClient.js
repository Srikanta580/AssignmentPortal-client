import axios from "axios";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`, // Replace with your actual base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
