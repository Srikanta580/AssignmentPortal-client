import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient";

// 1. STUDENT CRUD
export const fetchStudents = createAsyncThunk(
  "admin/fetchStudents",
  async ({ page, size }, thunkAPI) => {
    try {
      const res = await apiClient.get(`/admin/getStudents?page=${page}&size=${size}`);
      // console.log("Fetched students:", res.data); // Log the fetched data
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Fetch students failed"
      );
    }
  }
);

export const addStudent = createAsyncThunk(
  "admin/addStudent",
  async (studentData, thunkAPI) => {
    try {
      const res = await apiClient.post("/admin/addStudent", studentData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Add student failed"
      );
    }
  }
);

export const updateStudent = createAsyncThunk(
  "admin/updateStudent",
  async ({ id, ...changes }, thunkAPI) => {
    try {
      const res = await apiClient.put(`/admin/students/${id}`, changes);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Update student failed"
      );
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "admin/deleteStudent",
  async (id, thunkAPI) => {
    try {
      await apiClient.delete(`/admin/deleteStudent/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Delete student failed"
      );
    }
  }
);

// 1. FACULTY CRUD
export const fetchFaculties = createAsyncThunk(
  "admin/fetchFaculties",
  async ({ page, size }, thunkAPI) => {
    try {
      const res = await apiClient.get(`/admin/getFaculties?page=${page}&size=${size}`);
      // console.log("Fetched faculties:", res.data); // Log the fetched data
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Fetch faculties failed"
      );
    }
  }
);

export const addFaculty = createAsyncThunk(
  "admin/addFaculty",
  async (facultyData, thunkAPI) => {
    try {
      const res = await apiClient.post("/admin/addFaculty", facultyData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Add faculty failed"
      );
    }
  }
);

export const updateFaculty = createAsyncThunk(
  "admin/updateFaculty",
  async ({ id, ...changes }, thunkAPI) => {
    try {
      const res = await apiClient.put(`/admin/faculties/${id}`, changes);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Update faculty failed"
      );
    }
  }
);

export const deleteFaculty = createAsyncThunk(
  "admin/deleteFaculty",
  async (id, thunkAPI) => {
    try {
      await apiClient.delete(`/admin/deleteFaculty/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Delete faculty failed"
      );
    }
  }
);

// 2. CLASS MANAGEMENT
export const fetchClasses = createAsyncThunk(
  "admin/fetchClasses",
  async (_, thunkAPI) => {
    try {
      const res = await apiClient.get("/admin/classes");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Fetch classes failed"
      );
    }
  }
);

export const addClass = createAsyncThunk(
  "admin/addClass",
  async (classData, thunkAPI) => {
    try {
      const res = await apiClient.post("/admin/classes", classData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Add class failed");
    }
  }
);

export const assignClassToFaculty = createAsyncThunk(
  "admin/assignClassToFaculty",
  async ({ classId, facultyId }, thunkAPI) => {
    try {
      const res = await apiClient.post(`/admin/classes/${classId}/assign`, {
        facultyId,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Assign class failed"
      );
    }
  }
);

// 3. SUBJECT MANAGEMENT
export const fetchSubjects = createAsyncThunk(
  "admin/fetchSubjects",
  async (_, thunkAPI) => {
    try {
      const res = await apiClient.get("/admin/subjects");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Fetch subjects failed"
      );
    }
  }
);

export const addSubject = createAsyncThunk(
  "admin/addSubject",
  async (subjectData, thunkAPI) => {
    try {
      const res = await apiClient.post("/admin/subjects", subjectData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Add subject failed"
      );
    }
  }
);

// 4. FORM MANAGEMENT
export const generateForm = createAsyncThunk(
  "admin/generateForm",
  async (prompt, thunkAPI) => {
    console.log(prompt);
    try {
      const res = await apiClient.post("/form/generate", { prompt });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Server is busy! Retry later."
      );
    }
  }
);

export const fetchForms = createAsyncThunk(
  "admin/fetchForms",
  async (_, thunkAPI) => {
    try {
      const res = await apiClient.get("/form");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Fetch forms failed"
      );
    }
  }
);

export const saveForm = createAsyncThunk(
  "admin/saveForm",
  async (form, thunkAPI) => {
    try {
      const res = await apiClient.post("/form", form);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Form saving failed"
      );
    }
  }
);

// 5. NOTICE MANAGEMENT
export const fetchNotices = createAsyncThunk(
  "admin/fetchNotices",
  async (_, thunkAPI) => {
    try {
      const res = await apiClient.get("/admin/notices");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Fetch notices failed"
      );
    }
  }
);

export const addNotice = createAsyncThunk(
  "admin/addNotice",
  async (noticeData, thunkAPI) => {
    try {
      const res = await apiClient.post("/admin/notices", noticeData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Add notice failed"
      );
    }
  }
);
