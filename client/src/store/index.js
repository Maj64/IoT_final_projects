import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./actions/authSlice";
import sensorReducer from "./actions/sensorSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    sensor: sensorReducer
  },
});
