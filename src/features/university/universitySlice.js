import { createSlice } from "@reduxjs/toolkit";
import {
  submitUniversityBasicInfo,
  submitUniversityVerification,
  setupUniversityAdmin,
  addUniversityAdmin,
  getUniversityBySlug,
  addDepartmentalAdmin,
  addDepartment,
} from "./universityAPI";
import { login } from "../auth/authAPI";

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
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = null;
        action.payload.role.toLowerCase() === "univadmin" &&
          Object.assign(state, action.payload.university);
      })
      .addCase(addDepartmentalAdmin.fulfilled, (state, action) => {
        const newAdmin = action.payload;
        const deptId = newAdmin.department?.id;

        // Find department in university.departments
        const targetDept = state.departments?.find(
          (dept) => dept.id === deptId
        );

        if (targetDept) {
          // Add admin to that department’s admin list
          targetDept.admins.push({
            id: newAdmin.id.toString(), // if needed
            firstName: newAdmin.firstName,
            lastName: newAdmin.lastName,
            email: newAdmin.email,
          });
        }
      })
      .addCase(addDepartment.fulfilled, (state, action) => {
        state.departments
          ? state.departments.push({
              code: action.payload.departmentCode,
              name: action.payload.departmentName,
              id: action.payload.id,
            })
          : (state.departments = [action.payload]);
      });
  },
});

export const { clearStatus } = universitySlice.actions;
export default universitySlice.reducer;
