import { createSlice } from '@reduxjs/toolkit';
import type { User } from '../../types/User';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isModalVisible: boolean;
}

const initialState: UserState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isModalVisible: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initializeAuthRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    initializeAuthSuccess: (
      state,
      action: PayloadAction<{ user: User | null; token: string | null }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
    },
    initializeAuthFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    registerRequest: (
      state,
      _action: PayloadAction<{ email: string; password: string; name: string }>
    ) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    loginRequest: (
      state,
      _action: PayloadAction<{ email: string; password: string }>
    ) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('token');
    },

    setIsModalVisible: (state, action: PayloadAction<boolean>) => {
      state.isModalVisible = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  initializeAuthRequest,
  initializeAuthSuccess,
  initializeAuthFailure,
  registerFailure,
  registerRequest,
  registerSuccess,
  loginFailure,
  loginRequest,
  loginSuccess,
  logout,
  setIsModalVisible,
  clearError,
} = userSlice.actions;
export default userSlice.reducer;
