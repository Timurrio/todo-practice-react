// hooks/useFilteredTodos.ts
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { todoApi } from '../store/todoSlice/todoService';
import { type RootState } from '../store';
import filterTodos from '../functions/filterTodos';

export const useFilteredTodos = (userId?: string) => {
  const selectTodos = todoApi.endpoints.getTodos.select(userId ?? '');

  const todosResult = useSelector(selectTodos);

  const todos = todosResult?.data ?? [];

  const filter = useSelector((state: RootState) => state.todos.filter);

  const filteredTodos = useMemo(() => {
    return filterTodos(todos, filter);
  }, [todos, filter]);

  return { filteredTodos, isLoading: todosResult?.isLoading };
};
