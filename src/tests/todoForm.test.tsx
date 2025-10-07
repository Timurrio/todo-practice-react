import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import TodoForm from './TodoForm';
import {
  useCreateTodoMutation,
  useGetTodosQuery,
  useToggleAllTodosMutation,
} from '../../store/todoSlice/todoService';
import { useFilteredTodos } from '../../hooks/useFilteredTodos';
import { useSelector } from 'react-redux';

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useSelector: vi.fn(),
    useDispatch: () => vi.fn(),
  };
});

vi.mock('../../store/todoSlice/todoService', () => ({
  useGetTodosQuery: vi.fn(),
  useCreateTodoMutation: vi.fn(),
  useToggleAllTodosMutation: vi.fn(),
}));

vi.mock('../../hooks/useFilteredTodos', () => ({
  useFilteredTodos: vi.fn(),
}));

const mockStore: any = {
  getState: () => ({}),
  subscribe: () => {},
  dispatch: vi.fn(),
};

describe('TodoForm component', () => {
  it('creates a new todo when form is submitted', async () => {
    const mockCreateTodo = vi.fn();
    (useCreateTodoMutation as any).mockReturnValue([mockCreateTodo]);
    (useToggleAllTodosMutation as any).mockReturnValue([vi.fn()]);
    (useGetTodosQuery as any).mockReturnValue({ data: [] });
    (useFilteredTodos as any).mockReturnValue({ filteredTodos: [] });
    (useSelector as any).mockImplementation((selector: any) => {
      return selector.name === 'user' || selector.toString().includes('user')
        ? { user: { id: 1 } }
        : { filter: 'all' };
    });

    render(
      <Provider store={mockStore}>
        <TodoForm />
      </Provider>
    );

    const input = screen.getByPlaceholderText(
      'What needs to be done?'
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Learn Vitest' } });
    expect(input.value).toBe('Learn Vitest');

    fireEvent.submit(input);

    expect(mockCreateTodo).toHaveBeenCalledWith({
      completed: false,
      text: 'Learn Vitest',
      userId: 1,
    });

    expect(input.value).toBe('');
  });
});
