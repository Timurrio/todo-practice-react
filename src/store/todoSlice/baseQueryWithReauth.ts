import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '..';
import { logout, setTokens } from '../userSlice/userSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).user.accessToken ||
      localStorage.getItem('accessToken');
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});

export const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && (result.error as any).status === 401) {
    const refreshToken =
      (api.getState() as RootState).user.refreshToken ||
      localStorage.getItem('refreshToken');

    if (!refreshToken) {
      api.dispatch(logout());
      return result;
    }

    const refreshResult = await baseQuery(
      {
        url: '/user/refresh',
        method: 'POST',
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { accessToken, refreshToken: newRefreshToken } =
        refreshResult.data as {
          accessToken: string;
          refreshToken: string;
        };

      api.dispatch(setTokens({ accessToken, refreshToken: newRefreshToken }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};
