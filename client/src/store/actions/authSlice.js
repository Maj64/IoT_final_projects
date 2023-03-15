import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginAPI } from '../../service/authApi'

export const loginAsync = createAsyncThunk(
    'auth/loginAsync',
    async (credentials, { rejectWithValue }) => {
      try {
        const response = await loginAPI(credentials)
        return response.user
      } catch (err) {
        return rejectWithValue(err.response.data)
      }
    }
)


export const authSlice = createSlice({
  name: "counter",
  initialState: {
    user: null,
    isAuthenticated: true,
    error: null
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.user = action.payload
        state.error = null
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isAuthenticated = false
        state.user = null
        state.error = action.payload
      })
      .addCase(logoutSuccess, (state) => {
        state.isAuthenticated = false
        state.user = null
        state.error = null
      })
  },
});

// Action creators are generated for each case reducer function
export const { loginSuccess, loginFailure, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
