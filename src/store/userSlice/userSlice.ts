import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserWithoutPassword } from '../../types/User';
import { userApi } from './userApi';

export interface UserState {
  user: UserWithoutPassword | null;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: UserState = {
  user: null,
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  error: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        userApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.accessToken = payload.accessToken;
          state.refreshToken = payload.refreshToken ?? null;
          state.error = null;

          localStorage.setItem('accessToken', payload.accessToken);
          if (payload.refreshToken) {
            localStorage.setItem('refreshToken', payload.refreshToken);
          }
        }
      )
      .addMatcher(
        userApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.accessToken = payload.accessToken;
          state.refreshToken = payload.refreshToken ?? null;
          state.error = null;

          localStorage.setItem('accessToken', payload.accessToken);
          if (payload.refreshToken) {
            localStorage.setItem('refreshToken', payload.refreshToken);
          }
        }
      )
      .addMatcher(
        userApi.endpoints.refresh.matchFulfilled,
        (state, { payload }) => {
          state.accessToken = payload.accessToken;
          state.error = null;
          localStorage.setItem('accessToken', payload.accessToken);
        }
      )
      .addMatcher(
        userApi.endpoints.check.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.error = null;
        }
      )

      .addMatcher(
        (action) =>
          action.type.startsWith('userApi/') &&
          action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('userApi/') &&
          action.type.endsWith('/fulfilled'),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('userApi/') &&
          action.type.endsWith('/rejected'),
        (state, action) => {
          const message = action.payload?.data?.message?.trim();

          if (message === 'Not authorized' || message === 'Invalid token') {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
          } else {
            state.error = message || 'Unexpected error';
          }

          state.isLoading = false;
        }
      );
  },
});

export const { logout, clearError, setTokens } = userSlice.actions;
export default userSlice.reducer;
