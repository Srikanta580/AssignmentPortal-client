import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Stores logged-in user details { id, name, role }
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log("Called");
      console.log(action.payload);
      state.user = action.payload; // Set user details after login
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
