import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  role: null, // 'user', 'lawyer', 'admin'
  token: localStorage.getItem('authToken') || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login Success
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.user.role;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      state.loading = false;
      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('userRole', action.payload.user.role);
    },

    // Login Start
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    // Login Failure
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    // Signup Success
    signupSuccess: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.user.role;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      state.loading = false;
      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('userRole', action.payload.user.role);
    },

    // Signup Start
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    // Signup Failure
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Logout
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.role = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
    },

    // Update User Profile
    updateUserProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },

    // Clear Error
    clearError: (state) => {
      state.error = null;
    },

    // Restore Auth from Storage
    restoreAuth: (state) => {
      const token = localStorage.getItem('authToken');
      const role = localStorage.getItem('userRole');
      if (token && role) {
        state.token = token;
        state.role = role;
        state.isAuthenticated = true;
      }
    },
  },
});

export const {
  loginSuccess,
  loginStart,
  loginFailure,
  signupSuccess,
  signupStart,
  signupFailure,
  logout,
  updateUserProfile,
  clearError,
  restoreAuth,
} = authSlice.actions;

export default authSlice.reducer;
