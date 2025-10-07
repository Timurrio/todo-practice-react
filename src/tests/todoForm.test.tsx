import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import TodoForm from '../components/TodoForm/TodoForm';
import type { UserState } from '../store/userSlice/userSlice';
import type { TodoState } from '../store/todoSlice/todoSlice';
import TodoList from '../components/TodoList/TodoList';

import { type RootState } from '../store';

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useSelector: vi.fn(),
  };
});

vi.mock('../hooks/useFilteredTodos');
vi.mock('../store/todoSlice/todoService', () => ({
  useCreateTodoMutation: vi.fn(),
  useGetTodosQuery: vi.fn(),
  useToggleAllTodosMutation: vi.fn(),
  todoApi: {
    reducer: () => ({}),
    middleware: () => (next) => (action) => next(action),
  },
}));
vi.mock('../components/ToggleAllButton/ToggleAllButton');

vi.mock('../components/TodoList/TodoList', () => ({
  default: ({ todos }: any) => (
    <ul data-testid="todo-list">
      {todos.map((t: any) => (
        <li key={t.id}>{t.text}</li>
      ))}
    </ul>
  ),
}));

import { useSelector } from 'react-redux';
import { useFilteredTodos } from '../hooks/useFilteredTodos';
import {
  useCreateTodoMutation,
  useGetTodosQuery,
  useToggleAllTodosMutation,
} from '../store/todoSlice/todoService';

vi.mock('../components/ToggleAllButton/ToggleAllButton', () => ({
  default: vi.fn(({ handleFunction, isChecked }) => (
    <button
      data-testid="toggle-all-button"
      onClick={handleFunction}
      data-checked={isChecked}
    >
      Toggle All
    </button>
  )),
}));

describe('TodoForm', () => {
  const mockUseSelector = vi.mocked(useSelector);
  const mockUseFilteredTodos = vi.mocked(useFilteredTodos);
  const mockUseCreateTodoMutation = vi.mocked(useCreateTodoMutation);
  const mockUseToggleAllTodosMutation = vi.mocked(useToggleAllTodosMutation);
  const mockUseGetTodosQuery = vi.mocked(useGetTodosQuery);

  const mockToggleAllTodos = vi.fn();
  const mockCreateTodo = vi.fn();

  const mockUser = {
    id: 'user-1',
    name: 'Test User',
    email: 'test@example.com',
  };

  const mockTodos = [
    { id: '1', text: 'Test todo 1', completed: false, userId: 'user-1' },
    { id: '2', text: 'Test todo 2', completed: true, userId: 'user-1' },
  ];

  const defaultState = {
    todos: {
      filter: 'all' as const,
    },
    user: {
      user: mockUser,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseSelector.mockImplementation((selector) => {
      const state = {
        todos: defaultState.todos,
        user: defaultState.user,
      } as RootState;
      return selector(state);
    });

    mockUseFilteredTodos.mockReturnValue({
      filteredTodos: mockTodos,
      isLoading: false,
    });

    mockUseCreateTodoMutation.mockReturnValue([
      mockCreateTodo,
      { isLoading: false, error: null, data: undefined, reset: vi.fn() },
    ]);
    mockUseToggleAllTodosMutation.mockReturnValue([
      mockToggleAllTodos,
      { reset: vi.fn() },
    ]);
    mockUseGetTodosQuery.mockReturnValue({
      data: mockTodos,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });
  });

  const renderTodoForm = (initialState = defaultState) => {
    const store = configureStore({
      reducer: {
        todos: () => initialState.todos,
        user: () => initialState.user,
      },
    });

    return render(
      <Provider store={store}>
        <TodoForm />
      </Provider>
    );
  };

  const renderTodoFormAndTodoList = (initialState = defaultState) => {
    const store = configureStore({
      reducer: {
        todos: () => initialState.todos,
        user: () => initialState.user,
      },
    });

    const { filteredTodos } = useFilteredTodos(store.getState().user.user.id);

    return render(
      <Provider store={store}>
        <TodoForm />
        <TodoList todos={filteredTodos} />
      </Provider>
    );
  };

  it('renders the form with input field', () => {
    renderTodoForm();

    const input = screen.getByPlaceholderText('What needs to be done?');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('updates input value when typing', () => {
    renderTodoForm();

    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'New todo item' } });

    expect(input).toHaveValue('New todo item');
  });

  it('renders a new todo after submitting', async () => {
    renderTodoFormAndTodoList();

    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'Add todo from form' } });
    expect(input).toHaveValue('Add todo from form');

    fireEvent.submit(screen.getByTestId('todo-form'));

    mockUseFilteredTodos.mockReturnValueOnce({
      filteredTodos: [
        ...mockTodos,
        {
          id: '3',
          text: 'Add todo from form',
          completed: false,
          userId: 'user-1',
        },
      ],
      isLoading: false,
    });

    expect(input).toHaveValue('');

    renderTodoFormAndTodoList();

    await waitFor(() => {
      expect(screen.getByText('Add todo from form')).toBeInTheDocument();
    });
  });
});
