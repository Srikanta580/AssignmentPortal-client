import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Uses localStorage by default
import { persistReducer } from "redux-persist";

import authReducer from "../features/auth/authSlice";
import calendarReducer from "../features/calendar/calendarSlice";
import classAssignmentReducer from "../features/admin/classAssignmentSlice";
import formReducer from "../features/admin/formSlice";

const persistConfig = {
  key: "root", // Key for storage
  storage, // Where to store data (localStorage)
  whitelist: ["auth"], // Persist only auth (not products)
};

const rootReducer = combineReducers({
  auth: authReducer,
  calendar: calendarReducer,
  class: classAssignmentReducer,
  forms: formReducer,
});

export default persistReducer(persistConfig, rootReducer);
