import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/model/authSlice.js";
import questionsReducer from "../../features/questions/model/questionsSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
