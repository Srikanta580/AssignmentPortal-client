import { createSlice } from "@reduxjs/toolkit";
import {
  fetchStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  fetchFaculties,
  addFaculty,
  updateFaculty,
  deleteFaculty,
  fetchClasses,
  addClass,
  assignClassToFaculty,
  fetchSubjects,
  addSubject,
  fetchNotices,
  addNotice,
} from "./adminAPI";

const initialState = {
  students: [],
  faculties: [],
  classes: [],
  subjects: [],
  notices: [],
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
      state.students = payload;
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
      state.faculties = payload;
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
      state.classes = payload;
    });
    addCommonCases(addClass);
    builder.addCase(addClass.fulfilled, (state, { payload }) => {
      state.classes.push(payload);
    });
    addCommonCases(assignClassToFaculty);
    builder.addCase(assignClassToFaculty.fulfilled, (state, { payload }) => {
      // payload could be updated class object
      const idx = state.classes.findIndex((c) => c.id === payload.id);
      if (idx !== -1) state.classes[idx] = payload;
    });

    // SUBJECTS
    addCommonCases(fetchSubjects);
    builder.addCase(fetchSubjects.fulfilled, (state, { payload }) => {
      state.subjects = payload;
    });
    addCommonCases(addSubject);
    builder.addCase(addSubject.fulfilled, (state, { payload }) => {
      state.subjects.push(payload);
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
  },
});

export const { clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;
