import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    markMessagesAsRead: (state, action) => {
      const { contract_ref, id } = action.payload;
      state.users = state.users.map((item) => {
        if (
          item.contract_details.contract_ref === contract_ref &&
          (item.contract_details.receiver_id === id ||
            item.contract_details.sender_id === id)
        ) {
          return { ...item, isRead: true };
        }
        return item;
      })
    },
    setMessageUsers: (state, action) => {
      state.users = action.payload;
    },
    clearMessageState: (state) => {
      state.users = [];
    },
  },
});

export const { setMessageUsers, clearMessageState, markMessagesAsRead } = messageSlice.actions;
export default messageSlice.reducer;
