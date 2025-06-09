// src/redux/thunks/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient";

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, role }, thunkAPI) => {
    try {
      const response = await apiClient.post("/api/auth/login", {
        email,
        password,
        role,
      });

      // Store tokens in localStorage
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      return {
        user: response.data.user,
        role: role.toLowerCase(),
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Login failed");
    }
  }
);

// LOGOUT
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      await apiClient.post(
        "/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Clear tokens
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      return true;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Logout failed");
    }
  }
);
