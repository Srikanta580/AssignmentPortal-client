import { createSlice, current } from "@reduxjs/toolkit";
import {
  fetchStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  fetchFaculties,
  fetchAllFaculties,
  addFaculty,
  updateFaculty,
  deleteFaculty,
  fetchClasses,
  assignClass,
  fetchSubjects,
  addSubject,
  deleteSubject,
  fetchNotices,
  addNotice,
  uploadFacultyExcel,
  uploadFacultyCsv,
  uploadStudentExcel,
  uploadStudentCsv,
} from "./adminAPI";

const initialState = {
  students: [],
  faculties: [],
  classes: [],
  subjects: [],
  notices: [],
  currentStudentPage: 0,
  currentFacultyPage: 0,
  currentClassPage: 0,
  totalStudentPages: 0,
  totalFacultyPages: 0,
  totalClassPages: 0,
  hasMoreStudents: true,
  hasMoreFaculties: true,
  hasMoreClasses: true,
  status: "idle",
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // synchronous reducers
    clearAdminError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Utility to handle pending/fulfilled/rejected
    const addCommonCases = (thunk) => {
      builder
        .addCase(thunk.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        // .addCase(thunk.fulfilled, (state) => {
        //   state.status = "succeeded";
        // })
        .addCase(thunk.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        });
    };

    // STUDENTS
    addCommonCases(fetchStudents);

    builder.addCase(fetchStudents.fulfilled, (state, { payload }) => {
      const { students, currentStudentPage, totalStudentPages } = payload;

      state.students = students;
      state.currentStudentPage = currentStudentPage;
      state.totalStudentPages = totalStudentPages;
      state.hasMoreStudents = currentStudentPage + 1 < totalStudentPages;

      state.status = "succeeded";
    });

    addCommonCases(addStudent);
    builder.addCase(addStudent.fulfilled, (state, { payload }) => {
      state.students.push(payload);
    });
    addCommonCases(updateStudent);
    builder.addCase(updateStudent.fulfilled, (state, { payload }) => {
      const idx = state.students.findIndex((s) => s.id === payload.id);
      if (idx !== -1) state.students[idx] = payload;
    });
    addCommonCases(deleteStudent);
    builder.addCase(deleteStudent.fulfilled, (state, { payload }) => {
      state.students = state.students.filter((s) => s.id !== payload);
    });

    // FACULTIES
    addCommonCases(fetchFaculties);
    builder.addCase(fetchFaculties.fulfilled, (state, { payload }) => {
      const { faculties, currentFacultyPage, totalFacultyPages } = payload;

      state.faculties = faculties;
      state.currentFacultyPage = currentFacultyPage;
      state.totalFacultyPages = totalFacultyPages;
      state.hasMoreFaculties = currentFacultyPage + 1 < totalFacultyPages;

      state.status = "succeeded";
    });
    addCommonCases(fetchAllFaculties);
    builder.addCase(fetchAllFaculties.fulfilled, (state, { payload }) => {
      state.faculties = payload;
      state.currentFacultyPage = 0;
      state.totalFacultyPages = 1;
      state.hasMoreFaculties = false;
      state.status = "succeeded";
    });
    addCommonCases(addFaculty);
    builder.addCase(addFaculty.fulfilled, (state, { payload }) => {
      state.faculties.push(payload);
    });
    addCommonCases(updateFaculty);
    builder.addCase(updateFaculty.fulfilled, (state, { payload }) => {
      const idx = state.faculties.findIndex((f) => f.id === payload.id);
      if (idx !== -1) state.faculties[idx] = payload;
    });
    addCommonCases(deleteFaculty);
    builder.addCase(deleteFaculty.fulfilled, (state, { payload }) => {
      state.faculties = state.faculties.filter((f) => f.id !== payload);
    });

    // CLASSES
    addCommonCases(fetchClasses);
    builder.addCase(fetchClasses.fulfilled, (state, { payload }) => {
      const { classes, currentClassPage, totalClassPages } = payload;

      state.classes = classes;
      state.currentClassPage = currentClassPage;
      state.totalClassPages = totalClassPages;
      state.hasMoreClasses = currentClassPage + 1 < totalClassPages;

      state.status = "succeeded";
    });
    addCommonCases(assignClass);
    builder.addCase(assignClass.fulfilled, (state, { payload }) => {
      state.classes.push(payload);
    });

    // SUBJECTS
    addCommonCases(fetchSubjects);
    builder.addCase(fetchSubjects.fulfilled, (state, { payload }) => {
      state.subjects = payload; // Update the subjects state
      state.status = "succeeded";
    });
    addCommonCases(addSubject);
    builder.addCase(addSubject.fulfilled, (state, { payload }) => {
      state.subjects.push(payload);
    });
    addCommonCases(deleteSubject);
    builder.addCase(deleteSubject.fulfilled, (state, { payload }) => {
      state.subjects = state.subjects.filter((s) => s.subjectCode !== payload);
    });

    // NOTICES
    addCommonCases(fetchNotices);
    builder.addCase(fetchNotices.fulfilled, (state, { payload }) => {
      state.notices = payload;
    });
    addCommonCases(addNotice);
    builder.addCase(addNotice.fulfilled, (state, { payload }) => {
      state.notices.push(payload);
    });

    // FILE UPLOADS
    addCommonCases(uploadFacultyExcel);
    builder.addCase(uploadFacultyExcel.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      // Optionally, you can refresh faculty list here if needed
    });

    addCommonCases(uploadFacultyCsv);
    builder.addCase(uploadFacultyCsv.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
    });

    addCommonCases(uploadStudentExcel);
    builder.addCase(uploadStudentExcel.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
    });

    addCommonCases(uploadStudentCsv);
    builder.addCase(uploadStudentCsv.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
    });
  },
});

export const { clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;
