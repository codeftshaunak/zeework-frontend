import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice"; // Import your auth slice
import profileReducer from "./authSlice/profileSlice";
import clientSlice from "./clientSlice/clientSlice"; // Import your auth slice
import messageReducer from "./messageSlice/messageSlice";
import notificationReducer from "./notificationSlice/notificationSlice";
import pagesReducer from "./pagesSlice/pagesSlice";
import activeUserSlice from "./switchSlice/switchSlice";
import toastReducer from "./toastSlice/toastSlice";
const store = configureStore({
  reducer: {
    auth: authReducer, // Add the auth slice to your store
    profile: profileReducer,
    client: clientSlice,
    activeagency: activeUserSlice,
    pages: pagesReducer,
    message: messageReducer,
    notification: notificationReducer,
    toast: toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
