import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient";

export const submitUniversityBasicInfo = createAsyncThunk(
  "university/submitBasicInfo",
  async (data, thunkAPI) => {
    try {
      const response = await apiClient.post(
        "/auth/register-university/basic-info",
        data
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Failed to submit basic info"
      );
    }
  }
);

export const submitUniversityVerification = createAsyncThunk(
  "university/submitVerification",
  async ({ dto, document }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("document", document);
      // Append other DTO fields as needed
      for (const key in dto) {
        formData.append(key, dto[key]);
      }

      console.log(document);
      console.log(dto);

      const response = await apiClient.post(
        "/auth/register-university/verification",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Verification failed"
      );
    }
  }
);

export const setupUniversityAdmin = createAsyncThunk(
  "university/setupAdmin",
  async (adminData, thunkAPI) => {
    try {
      const response = await apiClient.post(
        "/auth/register-university/admin-setup",
        adminData
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Admin setup failed"
      );
    }
  }
);

export const addUniversityAdmin = createAsyncThunk(
  "university/addAdmin",
  async (adminData, thunkAPI) => {
    try {
      const response = await apiClient.post(
        "/v1/university/add-admin",
        adminData
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Add admin failed");
    }
  }
);
