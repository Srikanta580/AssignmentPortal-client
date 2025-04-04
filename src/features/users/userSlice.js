import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [], // Stores list of all users
    loading: false,
  },
  reducers: {},
});

export default userSlice.reducer;
