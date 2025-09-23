import api from './index';
import type { Todo } from '../types/todo';

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

export const getTodos = async (): Promise<Todo[]> => {
  const { data } = await api.get(`/todo`);
  return data;
};

export const getTodoById = async (todoId: string): Promise<Todo> => {
  const { data } = await api.get(`/todo${todoId}`);
  return data;
};
