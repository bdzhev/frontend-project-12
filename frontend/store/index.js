import { configureStore } from "@reduxjs/toolkit";
import channelsSliceReducer from "./slices/channelsSlice";
import messageSliceReducer from "./slices/messageSlice";
import authSliceReducer from "./slices/authSlice";
import modalSliceReducer from './slices/modalSlice';
import { channelsApi } from './services/channelsApi';

export default configureStore({
  reducer: {
    channels: channelsSliceReducer,
    messages: messageSliceReducer,
    auth: authSliceReducer,
    modal: modalSliceReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(channelsApi.middleware),
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
