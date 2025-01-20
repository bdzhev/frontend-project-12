import { createSlice } from "@reduxjs/toolkit";

const getInitState = () => {
  const authData = localStorage.getItem('authData');
  if (authData) {
    const { user, token } = JSON.parse(authData);
    return { user, token };
  }
  return { user: null, token: null };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitState(),
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
