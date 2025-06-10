import { createSlice } from "@reduxjs/toolkit";
import {
  submitUniversityBasicInfo,
  submitUniversityVerification,
  setupUniversityAdmin,
  addUniversityAdmin,
  getUniversityBySlug,
} from "./universityAPI";

const universitySlice = createSlice({
  name: "university",
  initialState: {
    loading: false,
    error: null,
    message: null,
    id: null,
    name: "",
  },
  reducers: {
    clearStatus: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitUniversityBasicInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitUniversityBasicInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(submitUniversityBasicInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Repeat same for the others
      .addCase(submitUniversityVerification.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(setupUniversityAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(addUniversityAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(getUniversityBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.success = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(getUniversityBySlug.rejected, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
      });
  },
});

export const { clearStatus } = universitySlice.actions;
export default universitySlice.reducer;
