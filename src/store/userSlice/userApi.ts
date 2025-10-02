import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { UserWithoutPassword } from '../../types/User';
import { jwtDecode } from 'jwt-decode';
import { todoApi } from '../todoSlice/todoService';

interface AuthResponse {
  token: string;
}

interface DecodedToken {
  id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

function decodeToken(token: string): UserWithoutPassword {
  const decoded: DecodedToken = jwtDecode(token);
  return {
    id: decoded.id,
    email: decoded.email,
    name: decoded.name,
  };
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    register: builder.mutation<
      { user: UserWithoutPassword; token: string },
      { email: string; password: string; name: string }
    >({
      query: (registerData) => ({
        url: '/user/registration',
        method: 'POST',
        body: registerData,
      }),
      transformResponse: (response: AuthResponse) => {
        localStorage.setItem('token', response.token);
        return { user: decodeToken(response.token), token: response.token };
      },
    }),

    login: builder.mutation<
      { user: UserWithoutPassword; token: string },
      { email: string; password: string }
    >({
      query: (loginData) => ({
        url: '/user/login',
        method: 'POST',
        body: loginData,
      }),
      transformResponse: (response: AuthResponse) => {
        localStorage.setItem('token', response.token);
        return { user: decodeToken(response.token), token: response.token };
      },
    }),

    check: builder.query<
      { user: UserWithoutPassword | null; token: string | null },
      void
    >({
      query: () => ({
        url: '/user/auth',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') ?? ' '}`,
        },
      }),
      transformResponse: (response: AuthResponse) => {
        localStorage.setItem('token', response.token);
        return { user: decodeToken(response.token), token: response.token };
      },
      transformErrorResponse: (error) => {
        localStorage.removeItem('token');
        return error;
      },
      providesTags: ['Auth'],
    }),

    logout: builder.mutation<void, void>({
      queryFn: async (_arg, api) => {
        localStorage.removeItem('token');
        api.dispatch(userApi.util.invalidateTags(['Auth']));
        api.dispatch(todoApi.util.invalidateTags(['Todo']));
        return { data: undefined };
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useCheckQuery } = userApi;
