import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
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
    // RTK Query API slice
    [apiSlice.reducerPath]: apiSlice.reducer,
    // Existing slices
    auth: authReducer,
    profile: profileReducer,
    client: clientSlice,
    activeagency: activeUserSlice,
    pages: pagesReducer,
    message: messageReducer,
    notification: notificationReducer,
    toast: toastReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [apiSlice.util.resetApiState.type],
      },
    }).concat(apiSlice.middleware),
});

// Enable listener behavior for the store (optional but recommended for RTK Query)
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
