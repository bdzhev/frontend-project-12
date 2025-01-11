import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    resetCredentials: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, resetCredentials } = authSlice.actions;
export default authSlice.reducer;
