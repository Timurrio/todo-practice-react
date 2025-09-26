import api from './index';
import type { User } from '../types/User';

export const register = async (
  registerData: Omit<User, 'id'>
): Promise<any> => {
  const { data } = await api.post('/user/registration', registerData);
  return data;
};

export const login = async (
  loginData: Omit<User, 'id' | 'name'>
): Promise<any> => {
  const { data } = await api.post('/user/login', loginData);
  return data;
};

export const check = async (token: string): Promise<{ token: string }> => {
  const { data } = await api.get('/user/auth', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
