import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Todo } from '../types/todo';
import Filters from '../types/filters';

export interface TodoState {
  items: Todo[];
  filter: Filters;
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  items: [],
  filter: Filters.All,
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    fetchTodosRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTodosSuccess: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload;
      state.loading = false;
    },
    fetchTodosFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    createTodoRequest: (state, _action: PayloadAction<Omit<Todo, 'id'>>) => {
      state.loading = true;
    },
    createTodoSuccess: (state, action: PayloadAction<Todo>) => {
      console.log('createTodoSuccess');
      state.items.push(action.payload);
      state.loading = false;
    },
    createTodoFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateTodoRequest: (state, _action: PayloadAction<Todo>) => {
      state.loading = true;
    },
    updateTodoSuccess: (state, action: PayloadAction<Todo>) => {
      const idx = state.items.findIndex((t) => t.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
      state.loading = false;
    },
    updateTodoFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteTodoRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
    },
    deleteTodoSuccess: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
      state.loading = false;
    },
    deleteTodoFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setFilter: (state, action: PayloadAction<Filters>) => {
      state.filter = action.payload;
    },
    clearCompletedTodosRequest(state, _action: PayloadAction<Todo[]>) {
      state.loading = true;
      state.error = null;
    },
    clearCompletedTodosSuccess(state, action: PayloadAction<string[]>) {
      state.items = state.items.filter((td) => !action.payload.includes(td.id));
      state.loading = false;
    },
    clearCompletedTodosFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    toggleAllTodosRequest(state, _action: PayloadAction<Todo[]>) {
      state.loading = true;
      state.error = null;
    },
    toggleAllTodosSuccess(state, action: PayloadAction<Todo[]>) {
      const updated = action.payload;

      state.items = state.items.map((td) => {
        const changed = updated.find((u) => u.id === td.id);
        return changed ? changed : td;
      });
      state.loading = false;
    },
    toggleAllTodosFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
  createTodoRequest,
  createTodoSuccess,
  createTodoFailure,
  updateTodoRequest,
  updateTodoSuccess,
  updateTodoFailure,
  deleteTodoRequest,
  deleteTodoSuccess,
  deleteTodoFailure,
  setFilter,
  clearCompletedTodosFailure,
  clearCompletedTodosRequest,
  clearCompletedTodosSuccess,
  toggleAllTodosFailure,
  toggleAllTodosRequest,
  toggleAllTodosSuccess,
} = todoSlice.actions;

export default todoSlice.reducer;
