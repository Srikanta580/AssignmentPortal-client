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
  async ({ formData }, thunkAPI) => {
    try {
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
      const response = await apiClient.post("/university/add-admin", adminData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Add admin failed");
    }
  }
);

export const getUniversityBySlug = createAsyncThunk(
  "university/getUniversityBySlug",
  async (slug, thunkAPI) => {
    try {
      const response = await apiClient.get(`/university/${slug}`);
      console.log(response.data);
      return { ...response.data, success: true };
    } catch (err) {
      const errorPayload = err.response?.data || {
        success: false,
        message: "University fetch failed",
      };
      return thunkAPI.rejectWithValue(errorPayload);
    }
  }
);

export const addDepartmentalAdmin = createAsyncThunk(
  "university/addDepartmentalAdmin",
  async (adminData, thunkAPI) => {
    try {
      const response = await apiClient.post(`/university/add-admin`, adminData);
      return { ...response.data, success: true };
    } catch (err) {
      const errorPayload = err.response?.data || {
        success: false,
        message: "Admin add failed",
      };
      return thunkAPI.rejectWithValue(errorPayload);
    }
  }
);

export const addDepartment = createAsyncThunk(
  "university/addDepartment",
  async (deptData, thunkAPI) => {
    try {
      const response = await apiClient.post(
        `/university/add-department`,
        deptData
      );
      return { ...response.data, success: true };
    } catch (err) {
      const errorPayload = err.response?.data || {
        success: false,
        message: "Dept. add failed",
      };
      return thunkAPI.rejectWithValue(errorPayload);
    }
  }
);

export const getAllUniversities = createAsyncThunk(
  "university/getAllUniversities",
  async (status, thunkAPI) => {
    try {
      const response = await apiClient.get(
        `/university${status ? `?status=${status}` : ""}`
      );
      console.log("Res : ", response.data);
      return response.data;
    } catch (err) {
      const errorPayload = err.response?.data || {
        message: "University fetch failed",
      };
      return thunkAPI.rejectWithValue(errorPayload);
    }
  }
);

export const approveUniversity = createAsyncThunk(
  "university/approveUniversity",
  async (uniId, thunkAPI) => {
    try {
      const response = await apiClient.post(`/university/${uniId}/approve`);
      console.log("Res : ", response.data);
      return response.data;
    } catch (err) {
      const errorPayload = err.response?.data || {
        message: "University Approval failed",
      };
      return thunkAPI.rejectWithValue(errorPayload);
    }
  }
);
