import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient";

export const markAttendance = createAsyncThunk(
  "attendance/markAttendance",
  async ({ studentId, present, classId }, thunkAPI) => {
    try {
      const res = await apiClient.post("/attendance/mark", {
        studentId,
        present,
        classId,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Attendance marking failed"
      );
    }
  }
);
