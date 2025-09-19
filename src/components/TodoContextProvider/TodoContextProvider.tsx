import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { Todo } from '../../types/todo';
import Filters from '../../types/filters';
import filterTodos from '../../functions/filterTodos';

interface TodoContextType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filteredTodos: Todo[];
  filter: Filters;
  setFilter: React.Dispatch<React.SetStateAction<Filters>>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState<Filters>(Filters.All);

  const filteredTodos: Todo[] = useMemo(
    () => filterTodos(todos, filter),
    [todos, filter]
  );

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider
      value={{ todos, setTodos, filteredTodos, filter, setFilter }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) {
    throw new Error('useTodos must be used within TodoProvider');
  }
  return ctx;
};
