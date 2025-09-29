import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import filterTodos from '../../functions/filterTodos';

export const selectTodos = (state: RootState) => state.todos.items;
export const selectFilter = (state: RootState) => state.todos.filter;

export const selectFilteredTodos = createSelector(
  [selectTodos, selectFilter],
  (todos, filter) => filterTodos(todos, filter)
);
