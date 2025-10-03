// src/services/todoApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Todo } from '../../types/todo';
import type { RootState } from '..';
import getToggleAllTodos from '../../functions/getToggleAllTodos';
import filterTodos from '../../functions/filterTodos';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Todo'],

  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], string>({
      query: (userId) => `/todo/${userId}`,
      providesTags: ['Todo'],
    }),

    createTodo: builder.mutation<Todo, Omit<Todo, 'id'>>({
      query: (todo) => ({
        url: '/todo',
        method: 'POST',
        body: todo,
      }),
      async onQueryStarted(newTodo, { dispatch, queryFulfilled }) {
        const tempId = 'temp-' + Math.random().toString(36).slice(2);

        const patchResult = dispatch(
          todoApi.util.updateQueryData('getTodos', newTodo.userId, (draft) => {
            draft.push({ ...newTodo, id: tempId });
          })
        );

        try {
          const { data: serverTodo } = await queryFulfilled;

          dispatch(
            todoApi.util.updateQueryData(
              'getTodos',
              newTodo.userId,
              (draft) => {
                const idx = draft.findIndex((t) => t.id === tempId);
                if (idx !== -1) {
                  draft[idx] = serverTodo;
                }
              }
            )
          );
        } catch {
          patchResult.undo();
        }
      },
    }),

    updateTodo: builder.mutation<Todo, Todo>({
      query: (todo) => ({
        url: `/todo/${todo.id}`,
        method: 'PUT',
        body: { text: todo.text, completed: todo.completed },
      }),
      async onQueryStarted(todo, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData('getTodos', todo.userId, (draft) => {
            const index = draft.findIndex((t) => t.id === todo.id);
            if (index !== -1) {
              draft[index] = todo;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    deleteTodo: builder.mutation<void, { id: string; userId: string }>({
      query: ({ id }) => ({
        url: `/todo/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted({ id, userId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData('getTodos', userId, (draft) => {
            return draft.filter((t) => t.id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    clearCompletedTodos: builder.mutation<
      string[],
      { userId: string; todos: Todo[] }
    >({
      query: ({ todos }) => ({
        url: '/todo/clearCompleted',
        method: 'POST',
        body: { todos },
      }),
      async onQueryStarted({ userId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData('getTodos', userId, (draft) => {
            return draft.filter((t) => !t.completed);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    toggleAllTodos: builder.mutation<Todo[], { userId: string; todos: Todo[] }>(
      {
        query: ({ todos }) => ({
          url: '/todo/toggleAll',
          method: 'PUT',
          body: { todos },
        }),
        async onQueryStarted(
          { userId, todos },
          { dispatch, queryFulfilled, getState }
        ) {
          const state = getState() as RootState;
          const filter = state.todos.filter;

          const patchResult = dispatch(
            todoApi.util.updateQueryData('getTodos', userId, (draft) => {
              return getToggleAllTodos(
                draft,
                filter,
                filterTodos(draft, filter)
              );
            })
          );
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        },
      }
    ),
  }),
});

export const {
  useGetTodosQuery,
  // useGetTodoByIdQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useClearCompletedTodosMutation,
  useToggleAllTodosMutation,
} = todoApi;
