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

const initialState = {
  themeColor: "#005f73",
  fontStyle: "Poppins",
  accentColor: "#94d2bd",
  borderRadius: "md",
  spacing: "normal",
  formStyle: "standard",
  buttonStyle: "solid",
  inputStyle: "filled",
  formBranding: true,
  title: "",
  questions: null,
};

const formsSlice = createSlice({
  name: "forms",
  initialState: {
    form: initialState,
    forms: [],
    responses: {},
    loading: false,
    error: null,
  },
  reducers: {
    editFormTitle: (state, action) => {
      state.form.title = action.payload;
    },
    editInputField: (state, action) => {
      state.form.questions[action.payload.id].label = action.payload.label;
    },
    deleteInputField: (state, action) => {
      state.form.questions = state.form.questions.filter(
        (qs) => qs.id !== action.payload
      );
    },
    setThemeColor: (state, action) => {
      state.form.themeColor = action.payload;
    },
    setFontStyle: (state, action) => {
      state.form.fontStyle = action.payload;
    },
    setAccentColor: (state, action) => {
      state.form.accentColor = action.payload;
    },
    setBorderRadius: (state, action) => {
      state.form.borderRadius = action.payload;
    },
    setSpacing: (state, action) => {
      state.form.spacing = action.payload;
    },
    setFormStyle: (state, action) => {
      state.form.style = action.payload;
    },
    setButtonStyle: (state, action) => {
      state.form.buttonStyle = action.payload;
    },
    setInputStyle: (state, action) => {
      state.form.inputStyle = action.payload;
    },
    setFormBranding: (state, action) => {
      state.form.branding = action.payload;
    },
    resetForm: (state) => {
      state.form = initialState;
    },
  },
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

    // FORM MANAGEMENT
    addCommonCases(fetchForms);
    builder.addCase(fetchForms.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.forms = payload;
    });
  },
});

export const {
  deleteInputField,
  editInputField,
  editFormTitle,
  setAccentColor,
  setBorderRadius,
  setButtonStyle,
  setFormBranding,
  setFormStyle,
  setInputStyle,
  setSpacing,
  setFontStyle,
  setThemeColor,
  resetForm,
} = formsSlice.actions;
export default formsSlice.reducer;
