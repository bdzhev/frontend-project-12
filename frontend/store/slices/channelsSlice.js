import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
// import { routes } from '../../utils/routes.js';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: '',
});

// export const fetchChannelData = createAsyncThunk()

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
      addChannel: channelsAdapter.addOne,
      addChannels: channelsAdapter.addMany,
      removeChannel: ((state, action) => {
        channelsAdapter.removeOne(state, action.payload.id);
        if (id === state.currentChannelId) {
          state.currentChannelId = 1;
        }
      }),
      updateChannel: channelsAdapter.updateOne,
      setCurrentId: ((state, action) => {
        state.currentChannelId = action.payload.id;
      }),
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
