import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient";

export const fetchSubjects = createAsyncThunk(
    "student/fetchSubjects",
    async ({ semester, departmentId, universityId }, thunkAPI) => {
        try {
            const res = await apiClient.get(
                `/student/getSubjects?semester=${semester}&departmentId=${departmentId}&universityId=${universityId}`
            );
            return res.data || [];
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || "Fetch subjects failed");
        }
    }
);

export const fetchAssignmentsBySubjectCode = createAsyncThunk(
    "assignment/getAssignmentsBySubject",
    async ({ subjectCode }, thunkAPI) => {
        try {
            const res = await apiClient.get(`/assignment/getAssignmentsBySubject/${subjectCode}`);
            return Array.isArray(res.data) ? res.data : res.data.assignments;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || "Fetch assignments by subject failed");
        }
    }
);
export const submitAssignment = createAsyncThunk(
    "assignment/submitAssignment",
    async ({ formData }, thunkAPI) => {
        try {
            const res = await apiClient.post("/assignment/submitAssignment", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || "Submit assignment failed");
        }
    }
);

export const fetchAllSubmissionsByRollNo = createAsyncThunk(
    "assignment/getAllSubmissionsByRollNo",
    async ({ rollNo }, thunkAPI) => {
        try {
            const res = await apiClient.get(`/assignment/getAllSubmissionsByRollNo?rollNo=${rollNo}`);
            return Array.isArray(res.data) ? res.data : res.data.submissions;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || "Fetch submissions failed");
        }
    }
);