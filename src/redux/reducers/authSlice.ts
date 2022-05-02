import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogged: false,
    logging: false,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.logging = true;
      state.user = action.payload;
    },
    loginSuccess: (state, action) => {
      state.logging = false;
      state.isLogged = true;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.logging = false;
      state.isLogged = false;
      state.user = null;
    },

    logout: (state) => {
      state.isLogged = false;
      state.user = null;
    },
  },
});
export const authActions = authSlice.actions;
// selectors
export const selectIsLogged = (state) => state.auth.isLogged;
export const selectLogging = (state) => state.auth.logging;
export const selectUser = (state) => state.auth.user;
export default authSlice.reducer;
