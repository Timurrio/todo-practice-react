import { describe, it, expect } from 'vitest';
import getToggleAllTodos from '../functions/getToggleAllTodos';
import type { Todo } from '../types/todo';

const todos: Todo[] = [
  { id: '1', text: 'todo 1', completed: false, userId: '1' },
  { id: '2', text: 'todo 2', completed: true, userId: '1' },
  { id: '3', text: 'todo 3', completed: false, userId: '1' },
];

describe('getToggleAllTodos', () => {
  it('toggles all todos when filter is "all" and not all are completed', () => {
    const result = getToggleAllTodos(todos, 'all', []);
    expect(result.every((t) => t.completed)).toBe(true);
  });

  it('unchecks all todos when filter is "all" and all are completed', () => {
    const allCompleted = todos.map((t) => ({ ...t, completed: true }));
    const result = getToggleAllTodos(allCompleted, 'all', []);
    expect(result.every((t) => !t.completed)).toBe(true);
  });

  it('marks filtered active todos as completed when filter is "active"', () => {
    const filtered = [todos[0], todos[2]];
    const result = getToggleAllTodos(todos, 'active', filtered);

    expect(result.find((t) => t.id === '1')?.completed).toBe(true);
    expect(result.find((t) => t.id === '3')?.completed).toBe(true);
    expect(result.find((t) => t.id === '2')?.completed).toBe(true);
  });

  it('marks filtered completed todos as not completed when filter is "completed"', () => {
    const filtered = [todos[1]];
    const result = getToggleAllTodos(todos, 'completed', filtered);

    expect(result.find((t) => t.id === '1')?.completed).toBe(false);
    expect(result.find((t) => t.id === '2')?.completed).toBe(false);
    expect(result.find((t) => t.id === '3')?.completed).toBe(false);
  });
});
