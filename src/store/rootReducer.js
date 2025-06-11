import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Uses localStorage by default
import { persistReducer } from "redux-persist";

import authReducer from "../features/auth/authSlice";
import calendarReducer from "../features/calendar/calendarSlice";
import classAssignmentReducer from "../features/admin/classAssignmentSlice";
import formReducer from "../features/admin/formSlice";
import adminReducer from "../features/admin/adminSlice";
import universityReducer from "../features/university/universitySlice";

const persistConfig = {
  key: "root", // Key for storage
  storage, // Where to store data (localStorage)
  whitelist: ["auth", "admin", "forms", "university"], // Persist only auth (not products)
};

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  calendar: calendarReducer,
  class: classAssignmentReducer,
  forms: formReducer,
  university: universityReducer,
});

export default persistReducer(persistConfig, rootReducer);
