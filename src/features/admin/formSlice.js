import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { generateForm } from "./adminAPI";

export const fetchForms = createAsyncThunk("forms/fetchForms", async () => {
  return [
    { id: "1", title: "Student Feedback Form", createdAt: "2025-04-25" },
    { id: "2", title: "Faculty Appraisal Form", createdAt: "2025-04-20" },
  ];
});

export const fetchFormResponses = createAsyncThunk(
  "forms/fetchResponses",
  async (formId) => {
    return [
      { id: "r1", answers: ["Good", "Yes", "No"] },
      { id: "r2", answers: ["Average", "No", "Yes"] },
    ];
  }
);

const formsSlice = createSlice({
  name: "forms",
  initialState: {
    form: null,
    forms: [],
    responses: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Utility to handle pending/fulfilled/rejected
    const addCommonCases = (thunk) => {
      builder
        .addCase(thunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(thunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    };

    // FORM GENERATION
    addCommonCases(generateForm);
    builder.addCase(generateForm.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.form = payload;
    });
  },
});

export default formsSlice.reducer;
