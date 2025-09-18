import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    clearNotificationState: (state) => {
      state.notification = [];
    },
  },
});

export const { setNotification, clearNotificationState } =
  notificationSlice.actions;

export default notificationSlice.reducer;
