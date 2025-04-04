import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Uses localStorage by default
import { persistReducer } from "redux-persist";

import authReducer from "../features/auth/authSlice";

const persistConfig = {
  key: "root", // Key for storage
  storage, // Where to store data (localStorage)
  whitelist: ["auth"], // Persist only auth (not products)
};

const rootReducer = combineReducers({
  auth: authReducer,
});

export default persistReducer(persistConfig, rootReducer);
