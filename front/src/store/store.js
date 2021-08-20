import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./slices/adminSlice";

import authSlice from "./slices/authSlice";
import examSlice from "./slices/examSlice";
import notificationSlice from "./slices/notification";

const store = configureStore({
  reducer: { auth: authSlice.reducer, notification: notificationSlice.reducer,exam:examSlice.reducer,admin:adminSlice.reducer },
});

export default store;
