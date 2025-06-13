import { createSlice } from "@reduxjs/toolkit";
import { markAttendance } from "./attendanceAPI";

const initialState = {
  attandance: [],
  error: null,
  loading: false,
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Utility to handle pending/fulfilled/rejected
    const addCommonCases = (thunk) => {
      builder
        .addCase(thunk.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(thunk.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        });
    };

    addCommonCases(markAttendance);
    builder.addCase(markAttendance.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
    });
  },
});

export default attendanceSlice.reducer;
