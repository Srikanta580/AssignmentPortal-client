import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient";

export const fetchClassesByFaculty = createAsyncThunk(
    "admin/fetchClassesByFaculty",
    async ({ facultyId }, thunkAPI) => {
        try {
            const res = await apiClient.get(`/admin/class/getClassesByFaculty/${facultyId}`);
            // console.log("Classes fetched:", res);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || "Fetch classes by faculty failed");
        }
    }
);