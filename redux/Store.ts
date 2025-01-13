import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import projectIdSlice from "./projectIdSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    projectId: projectIdSlice,
  },
});
