import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./authActions.js";

// Load persisted auth from localStorage
const persistedAuth = JSON.parse(localStorage.getItem("auth"));

const initialState = {
  user: persistedAuth?.user || null,
  token: persistedAuth?.token || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("auth"); // ✅ clear both user + token
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;

        // ✅ persist both user and token
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: action.payload.user,
            token: action.payload.token,
          })
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
