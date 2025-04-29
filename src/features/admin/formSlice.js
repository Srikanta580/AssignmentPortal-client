import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Dummy async calls (you'll replace with actual API later)
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
    forms: [],
    responses: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchForms.fulfilled, (state, action) => {
        state.loading = false;
        state.forms = action.payload;
      })
      .addCase(fetchForms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFormResponses.fulfilled, (state, action) => {
        const [formId, responses] = action.meta.arg;
        state.responses[formId] = action.payload;
      });
  },
});

export default formsSlice.reducer;
