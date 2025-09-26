import { createSlice } from "@reduxjs/toolkit";

const getInitialToastState = () => {
  try {
    const stored = sessionStorage.getItem("paymentNotify");
    return (stored !== "true" && stored !== "false" && stored !== "undefined") ? false : true;
  } catch (error) {
    return true;
  }
};

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    visible: getInitialToastState(),
  },
  reducers: {
    showToast: (state) => {
      state.visible = false;
    },
    hideToast: (state) => {
      state.visible = true;
    },
    setToast: (state, action) => {
      state.visible = action.payload;
    },
  },
});

export const { showToast, hideToast, setToast } = toastSlice.actions;
export default toastSlice.reducer;
