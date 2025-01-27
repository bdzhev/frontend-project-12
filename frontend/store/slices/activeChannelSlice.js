/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import defaultChannel from '../../utils/defaultChannel';

const activeChannelSlice = createSlice({
  name: 'activeChannel',
  initialState: { active: defaultChannel },
  reducers: {
    setCurChannel: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setCurChannel } = activeChannelSlice.actions;
export const activeChannelSelector = (state) => state.activeChannel.active;
export default activeChannelSlice.reducer;
