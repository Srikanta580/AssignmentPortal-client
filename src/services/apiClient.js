import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Replace with your actual base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
