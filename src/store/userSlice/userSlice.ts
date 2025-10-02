import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserWithoutPassword } from '../../types/User';
import { userApi } from './userApi';

export interface UserState {
  user: UserWithoutPassword | null;
  token: string | null;
  error: string | null;
  isModalVisible: boolean;
  isLoading: boolean;
}

const initialState: UserState = {
  user: null,
  token: null,
  error: null,
  isModalVisible: false,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
    builder
      .addMatcher(
        userApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.token = payload.token;
          state.error = null;
        }
      )
      .addMatcher(
        userApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.token = payload.token;
          state.error = null;
        }
      )
      .addMatcher(
        userApi.endpoints.check.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.token = payload.token;
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith('/rejected') &&
          action.type.startsWith('userApi/'),
        (state, action) => {
          state.error = action.error?.message ?? 'Unexpected error';
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
          state.error = action.error?.message ?? 'Unexpected error';
          state.isLoading = false;
        }
      );
  },
});

export const { logout, setIsModalVisible, clearError } = userSlice.actions;
export default userSlice.reducer;
