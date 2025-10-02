import { useEffect } from 'react';
import { useCheckQuery } from '../store/userSlice/userApi';
import { useAppDispatch } from '../store';
import { logout } from '../store/userSlice/userSlice';

export const useInitializeAuth = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useCheckQuery(undefined, {
    skip: !localStorage.getItem('token'),
  });

  useEffect(() => {
    if (error) {
      console.error('Auth check failed:', error);
      dispatch(logout());
    }
  }, [error, dispatch]);

  return { user: data?.user ?? null, token: data?.token ?? null, isLoading };
};
