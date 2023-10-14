import {
  asyncLoginWithEmail,
  asyncSignUpWithEmail,
  asyncSocialAuth,
} from "@/services/auth/auth.service";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentRequestId: "",
  isLoading: false,
  error: null,
  data: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    clearAuthStore(state, { payload }) {
      state.data = null;
    },
    setUserData(state, { payload }) {
      state.data = payload;
    },
  },
  extraReducers: {
    [asyncLoginWithEmail.pending.type]: (state, _action) => {
      const { requestId } = _action.meta;
      state.isLoading = true;
      state.currentRequestId = requestId;
    },
    [asyncLoginWithEmail.fulfilled.type]: (state, _action) => {
      const { requestId } = _action.meta;
      if (state.isLoading && state.currentRequestId === requestId) {
        state.isLoading = false;
        state.data = { ..._action.payload, isLoggedIn: true };
        state.currentRequestId = undefined;
        state.error = null;
      }
    },
    [asyncLoginWithEmail.rejected.type]: (state, _action) => {
      const { requestId } = _action.meta;
      if (state.isLoading && state.currentRequestId === requestId) {
        state.isLoading = false;
        state.error = _action.error;
        state.currentRequestId = undefined;
      }
    },
    [asyncSignUpWithEmail.pending.type]: (state, _action) => {
      const { requestId } = _action.meta;
      state.isLoading = true;
      state.currentRequestId = requestId;
    },
    [asyncSignUpWithEmail.fulfilled.type]: (state, _action) => {
      const { requestId } = _action.meta;
      if (state.isLoading && state.currentRequestId === requestId) {
        state.isLoading = false;
        state.data = { ..._action.payload, isLoggedIn: true };
        state.currentRequestId = undefined;
        state.error = null;
      }
    },
    [asyncSignUpWithEmail.rejected.type]: (state, _action) => {
      const { requestId } = _action.meta;
      if (state.isLoading && state.currentRequestId === requestId) {
        state.isLoading = false;
        state.error = _action.error;
        state.currentRequestId = undefined;
      }
    },
    [asyncSocialAuth.pending.type]: (state, _action) => {
      const { requestId } = _action.meta;
      state.isLoading = true;
      state.currentRequestId = requestId;
    },
    [asyncSocialAuth.fulfilled.type]: (state, _action) => {
      const { requestId } = _action.meta;
      if (state.isLoading && state.currentRequestId === requestId) {
        state.isLoading = false;
        state.data = { ..._action.payload, isLoggedIn: true };
        state.currentRequestId = undefined;
        state.error = null;
      }
    },
    [asyncSocialAuth.rejected.type]: (state, _action) => {
      const { requestId } = _action.meta;
      if (state.isLoading && state.currentRequestId === requestId) {
        state.isLoading = false;
        state.error = _action.error;
        state.currentRequestId = undefined;
      }
    },
  },
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const getUserDetails = (state) => state.auth.data || {};

// Reducer
export default authSlice.reducer;
