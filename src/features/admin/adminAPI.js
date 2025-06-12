import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient";

// 1. STUDENT CRUD
export const fetchStudents = createAsyncThunk(
  "admin/fetchStudentsData",
  async ({ page = 0, semester = 0, universityId, departmentId}, thunkAPI) => {
    try {
      const res = await apiClient.get(`/admin/getStudents?page=${page}&semester=${semester}&universityId=${universityId}&departmentId=${departmentId}`);
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
  async ({ page , universityId, departmentId }, thunkAPI) => {
    try {
      const res = await apiClient.get(`/admin/getFaculties?page=${page}&universityId=${universityId}&departmentId=${departmentId}&universityId=${universityId}`);
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

export const fetchAllFaculties = createAsyncThunk(
  "admin/fetchAllFaculties",
  async ({departmentId, universityId }, thunkAPI) => {
    try {
      const res = await apiClient.get(`/admin/getAllFaculties?departmentId=${departmentId}&universityId=${universityId}`);
      return res.data.faculties; // assuming backend returns { faculties: [...] }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Fetch all faculties failed"
      );
    }
  }
);

// 2. CLASS MANAGEMENT
export const fetchClasses = createAsyncThunk(
  "admin/fetchClasses",
  async ({ departmentId, universityId, page}, thunkAPI) => {
    try {
      const res = await apiClient.get(`/admin/class/getAllClasses?page=${page}&departmentId=${departmentId}&universityId=${universityId}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Fetch classes failed"
      );
    }
  }
);

export const assignClass = createAsyncThunk(
  "admin/assignClass",
  async (classData, thunkAPI) => {
    try {
      const res = await apiClient.post("/admin/class/assignClass", classData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Add class failed");
    }
  }
);

// 3. SUBJECT MANAGEMENT
export const fetchSubjects = createAsyncThunk(
  "admin/fetchSubjects",
  async ({departmentId, universityId}, thunkAPI) => {
    try {
      const res = await apiClient.get(`/admin/getSubjects?departmentId=${departmentId}&universityId=${universityId}`);
      // console.log("Fetched subjects:", res.data); // Log the fetched data
      return res.data.subjects || []; // Extract the subjects array
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
      const res = await apiClient.post("/admin/addSubject", subjectData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Add subject failed"
      );
    }
  }
);

export const deleteSubject = createAsyncThunk(
  "admin/deleteSubject",
  async (subjectCode, thunkAPI) => {
    try {
      await apiClient.delete(`/admin/deleteSubject/${subjectCode}`);
      return subjectCode;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Delete subject failed"
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

// Faculty Excel Upload
export const uploadFacultyExcel = createAsyncThunk(
  "admin/uploadFacultyExcel",
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await apiClient.post("/fileInput/uploadFacultyExcel", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Faculty Excel upload failed"
      );
    }
  }
);

// Faculty CSV Upload
export const uploadFacultyCsv = createAsyncThunk(
  "admin/uploadFacultyCsv",
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await apiClient.post("/fileInput/uploadFacultyCsv", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Faculty CSV upload failed"
      );
    }
  }
);

// Student Excel Upload
export const uploadStudentExcel = createAsyncThunk(
  "admin/uploadStudentExcel",
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await apiClient.post("/fileInput/uploadStudentExcel", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Student Excel upload failed"
      );
    }
  }
);

// Student CSV Upload
export const uploadStudentCsv = createAsyncThunk(
  "admin/uploadStudentCsv",
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await apiClient.post("/fileInput/uploadStudentCsv", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Student CSV upload failed"
      );
    }
  }
);
