import { createSlice } from "@reduxjs/toolkit";
import {
  submitUniversityBasicInfo,
  submitUniversityVerification,
  setupUniversityAdmin,
  addUniversityAdmin,
  getUniversityBySlug,
  addDepartmentalAdmin,
  addDepartment,
  getAllUniversities,
  approveUniversity,
} from "./universityAPI";
import { login, logoutUser } from "../auth/authAPI";

const initialState = {
  loading: false,
  error: null,
  message: null,
  allUniversities: [],
  pendingRequests: [],
  recentRequests: [],
  id: null,
  name: "",
  departments: [],
  slug: "",
  email: "",
  website: "",
  orbitId: "",
};

const universitySlice = createSlice({
  name: "university",
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.error = null;
      state.message = null;
    },
    clearUniversities: (state) => {
      state.allUniversities = [];
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
        state.slug = action.payload.slug;
        state.success = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(getUniversityBySlug.rejected, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
      })

      .addCase(getAllUniversities.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUniversities.fulfilled, (state, action) => {
        state.allUniversities = action.payload;
        const pending = action.payload.filter((u) => u.status === "pending");
        state.pendingRequests = pending;
        state.recentRequests = [...pending]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        state.loading = false;
        state.success = true;
        state.message = "Universities loaded successfully";
      })
      .addCase(getAllUniversities.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload.message;
      })

      .addCase(approveUniversity.fulfilled, (state, action) => {
        const approvedUniversityId = action.meta.arg; // This is the ID you dispatched

        // Remove the approved university from pendingRequests
        state.pendingRequests = state.pendingRequests.filter(
          (uni) => uni.id !== approvedUniversityId
        );

        // Remove the approved university from recentRequests
        state.recentRequests = state.recentRequests.filter(
          (uni) => uni.id !== approvedUniversityId
        );

        // Change the state to "complete" from "pending"
        state.allUniversities = state.allUniversities.filter((uni) =>
          uni.id === approvedUniversityId
            ? (uni.status = "complete")
            : uni.status
        );

        state.loading = false;
        state.error = null;
        state.success = true;
        state.message = "Approved Successfully";
      })
      .addCase(approveUniversity.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload.message;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = null;
        action.payload.role.toLowerCase() === "univadmin" &&
          Object.assign(state, action.payload.university);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        Object.assign(state, {
          ...initialState,
          id: state.id,
          name: state.name,
          slug: state.slug,
        });
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

export const { clearStatus, clearUniversities } = universitySlice.actions;
export default universitySlice.reducer;
