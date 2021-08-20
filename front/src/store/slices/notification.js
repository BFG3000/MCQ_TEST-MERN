import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { notification: { status: "", message: "" }, loading: false },
  reducers: {
    showNotification(state, action) {
      state.loading = action.payload.loading;
      state.notification = {
        status: action.payload.status,
        message: action.payload.message,
      };
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
