import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice";
import modalSliceReducer from './slices/modalSlice';
import { chatApi } from './services/chatApi';

export default configureStore({
  reducer: {
    auth: authSliceReducer,
    modal: modalSliceReducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware),
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
