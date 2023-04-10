import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSensors } from "../../services/sensor";

export const loginAsync = createAsyncThunk(
    'auth/loginAsync',
    async ({ rejectWithValue }) => {
      try {
        const id = "all";
        const response = await getSensors(id);
        const data = response.data;
        const arrayOfObjects = Object.values(data);
        const newSensorList = [...arrayOfObjects];
        return newSensorList
      } catch (err) {
        return rejectWithValue(err.response.data)
      }
    }
)


export const sensorSlice = createSlice({
  name: "counter",
  initialState: {
    sensorList: []
  },
  reducers: {
    storeSensorList: (state, action) => {
        state.sensorList = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.sensorList = action.payload
      })
  }
});

// Action creators are generated for each case reducer function
export const { storeSensorList } = sensorSlice.actions;

export default sensorSlice.reducer;
