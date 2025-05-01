import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchForms, generateForm, saveForm } from "./adminAPI";
import apiClient from "../../services/apiClient";

export const fetchFormResponses = createAsyncThunk(
  "forms/fetchResponses",
  async (formId) => {
    return [
      { id: "r1", answers: ["Good", "Yes", "No"] },
      { id: "r2", answers: ["Average", "No", "Yes"] },
    ];
  }
);

export const fetchForm = createAsyncThunk(
  "form/fetchForm",
  async (formId, thunkAPI) => {
    try {
      const res = await apiClient.get(`/form/${formId}`);
      console.log(res.data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Fetch forms failed"
      );
    }
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
    submissionForm: initialState,
    forms: [],
    responses: {},
    loading: false,
    error: null,
  },
  reducers: {
    // Form fields management
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
    // Form customization
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
    // Form actions

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
    addCommonCases(saveForm);
    builder.addCase(saveForm.fulfilled, (state) => {
      state.loading = false;
    }),
      addCommonCases(fetchForms);
    builder.addCase(fetchForms.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.forms = payload;
    });
    addCommonCases(fetchForm);
    builder.addCase(fetchForm.fulfilled, (state, { payload }) => {
      state.loading = false;
      const parsedData = JSON.parse(payload.configJson);
      state.submissionForm = {
        id: payload.id,
        title: payload.title,
        description: payload.description,
        createdAt: payload.createdAt,
        ...parsedData,
      };
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
