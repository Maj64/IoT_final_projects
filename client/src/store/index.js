import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./actions/authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
