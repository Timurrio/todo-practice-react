import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { UserWithoutPassword } from '../../types/User';
import { jwtDecode } from 'jwt-decode';
import { todoApi } from '../todoSlice/todoService';

interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
}

interface DecodedToken {
  id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

function decodeToken(token?: string): UserWithoutPassword {
  if (!token || typeof token !== 'string') {
    throw new Error('Invalid token');
  }

  const decoded: DecodedToken = jwtDecode(token);
  return {
    id: decoded.id,
    email: decoded.email,
    name: decoded.name,
  };
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    register: builder.mutation<
      { user: UserWithoutPassword; accessToken: string; refreshToken?: string },
      { email: string; password: string; name: string }
    >({
      query: (body) => ({
        url: '/user/registration',
        method: 'POST',
        body,
      }),
      transformResponse: (response: AuthResponse) => {
        const user = decodeToken(response.accessToken);
        localStorage.setItem('accessToken', response.accessToken);
        if (response.refreshToken) {
          localStorage.setItem('refreshToken', response.refreshToken);
        }
        return {
          user,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        };
      },
    }),

    login: builder.mutation<
      { user: UserWithoutPassword; accessToken: string; refreshToken?: string },
      { email: string; password: string }
    >({
      query: (body) => ({
        url: '/user/login',
        method: 'POST',
        body,
      }),
      transformResponse: (response: AuthResponse) => {
        const user = decodeToken(response.accessToken);
        localStorage.setItem('accessToken', response.accessToken);
        if (response.refreshToken) {
          localStorage.setItem('refreshToken', response.refreshToken);
        }
        return {
          user,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        };
      },
    }),

    refresh: builder.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: '/user/refresh',
        method: 'POST',
        body: { refreshToken: localStorage.getItem('refreshToken') },
      }),
      transformResponse: (response: AuthResponse) => {
        localStorage.setItem('accessToken', response.accessToken);
        return { accessToken: response.accessToken };
      },
    }),

    check: builder.query<
      { user: UserWithoutPassword | null; accessToken: string | null },
      void
    >({
      query: () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No access token');
        }
        return {
          url: '/user/auth',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      transformResponse: (response: AuthResponse) => {
        if (!response.accessToken) {
          throw new Error('No access token in response');
        }
        const user = decodeToken(response.accessToken);
        console.log(user);
        console.log(response.accessToken);
        localStorage.setItem('accessToken', response.accessToken);
        return { user, accessToken: response.accessToken };
      },
      transformErrorResponse: (error) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return { user: null, accessToken: null };
      },
      providesTags: ['Auth'],
    }),

    logout: builder.mutation<void, void>({
      queryFn: async (_arg, api) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        api.dispatch(userApi.util.invalidateTags(['Auth']));
        api.dispatch(todoApi.util.invalidateTags(['Todo']));
        return { data: undefined };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshMutation,
  useCheckQuery,
} = userApi;
