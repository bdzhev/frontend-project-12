/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const getInitState = () => {
  const authData = localStorage.getItem('authData');
  const initData = authData
    ? JSON.parse(authData)
    : { user: null, token: null };

  return { user: initData.user, token: initData.token };
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
