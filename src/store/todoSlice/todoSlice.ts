import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import Filters from '../../types/filters';

export interface TodoState {
  filter: Filters;
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  filter: Filters.All,
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Filters>) => {
      state.filter = action.payload;
    },
  },
});

export const { setFilter } = todoSlice.actions;

export default todoSlice.reducer;
