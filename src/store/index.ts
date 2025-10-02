import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice/todoSlice';
import userReducer from './userSlice/userSlice';
import { useDispatch } from 'react-redux';
import { todoApi } from './todoSlice/todoService';
import { userApi } from './userSlice/userApi';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    user: userReducer,
    [todoApi.reducerPath]: todoApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(todoApi.middleware)
      .concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
