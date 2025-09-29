import api from './index';
import type { Todo } from '../types/todo';
import { useSelector } from 'react-redux';
import type { UserState } from '../store/userSlice/userSlice';
import type { RootState } from '../store';
import type { User } from '../types/User';

export const createTodo = async (todoData: Omit<Todo, 'id'>): Promise<Todo> => {
  const { data } = await api.post(`/todo`, todoData);
  return data;
};

export const updateTodo = async (todoData: Todo): Promise<Todo> => {
  const { data } = await api.put(`/todo/${todoData.id}`, {
    text: todoData.text,
    completed: todoData.completed,
  });
  return data;
};

export const deleteTodo = async (todoId: string): Promise<Todo> => {
  const { data } = await api.delete(`/todo/${todoId}`);
  return data;
};

export const getTodos = async (userId: string): Promise<Todo[]> => {
  const { data } = await api.get(`/todo/${userId}`);
  return data;
};

export const getTodoById = async (todoId: string): Promise<Todo> => {
  const { data } = await api.get(`/todo${todoId}`);
  return data;
};

export const clearCompletedTodos = async (todos: Todo[]): Promise<string[]> => {
  const { data } = await api.post(`/todo/clearCompleted`, { todos: todos });
  return data;
};

export const toggleAllTodos = async (todos: Todo[]): Promise<Todo[]> => {
  const { data } = await api.put(`/todo/toggleAll`, { todos: todos });
  return data;
};
