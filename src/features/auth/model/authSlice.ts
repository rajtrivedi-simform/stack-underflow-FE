import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AuthState, User } from "../../../entities/user/types";
import { login, type LoginPayload } from "../api/login";
import { register, type RegisterPayload } from "../api/register";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk<
  User,
  LoginPayload,
  { rejectValue: string }
>("auth/loginUser", async (payload, thunkApi) => {
  try {
    const response = await login(payload);
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data.user;
  } catch (error) {
    return thunkApi.rejectWithValue(
      error instanceof Error ? error.message : "Login failed",
    );
  }
});

export const registerUser = createAsyncThunk<
  User,
  RegisterPayload,
  { rejectValue: string }
>("auth/registerUser", async (payload, thunkApi) => {
  try {
    const response = await register(payload);
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data.user;
  } catch (error) {
    return thunkApi.rejectWithValue(
      error instanceof Error ? error.message : "Registration failed",
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Login failed";
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Registration failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
