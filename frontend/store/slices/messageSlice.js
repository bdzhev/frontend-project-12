import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';

const messageAdapter = createEntityAdapter();
const initialState = messageAdapter.getInitialState();

// createAsyncThunk to get messages for a current message

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messageAdapter.addOne,
  }
  // extraReducers - to react to channel changes
});

export const { actions } = messageSlice;
export const selectors = messageAdapter.getSelectors((state) => state.messages);
export default messageSlice.reducer;
