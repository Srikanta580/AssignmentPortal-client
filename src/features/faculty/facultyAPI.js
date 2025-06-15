import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient";

// Fetch classes assigned to a faculty
export const fetchClassesByFaculty = createAsyncThunk(
    "admin/fetchClassesByFaculty",
    async ({ facultyId }, thunkAPI) => {
        try {
            const res = await apiClient.get(`/admin/class/getClassesByFaculty/${facultyId}`);
            return res.data.classes;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || "Fetch classes by faculty failed");
        }
    }
);

// Add assignment
export const addAssignment = createAsyncThunk(
    "assignment/addAssignment",
    async (assignmentData, thunkAPI) => {
        try {
            const formData = new FormData();
            Object.entries(assignmentData).forEach(([key, value]) => {
                formData.append(key, value);
            });
            const res = await apiClient.post("/assignment/addAssignment", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || "Add assignment failed");
        }
    }
);

// Fetch assignments for a faculty
export const fetchAssignmentsBySubjectCode = createAsyncThunk(
    "assignemnt/getAssignmentsBySubject",
    async ({ subjectCode }, thunkAPI) => {
        try {
            const res = await apiClient.get(`/assignment/getAssignmentsBySubject/${subjectCode}`);
            // Fix: handle both array and object response
            return Array.isArray(res.data) ? res.data : res.data.assignments;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || "Fetch assignments by faculty failed");
        }
    }
);