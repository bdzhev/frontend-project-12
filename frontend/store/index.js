import { configureStore } from "@reduxjs/toolkit";
import channelsSliceReducer from "./slices/channelsSlice";
import messageSliceReducer from "./slices/messageSlice";
import authSliceReducer from "./slices/authSlice";

export default configureStore({
  reducer: {
    channels: channelsSliceReducer,
    messages: messageSliceReducer,
    auth: authSliceReducer,
  },
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
