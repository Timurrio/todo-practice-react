import api from './index';
import type { User } from '../types/User';

export const register = async (
  registerData: Omit<User, 'id'>
): Promise<any> => {
  console.log(registerData);
  const { data } = await api.post('/user/register', registerData);
  return data;
};

export const login = async (
  loginData: Omit<User, 'id' | 'name'>
): Promise<any> => {
  console.log(loginData);
  const { data } = await api.post('/user/login', loginData);
  return data;
};

export const check = async (user: User): Promise<{ token: string }> => {
  console.log(user);
  const { data } = await api.get('/user/check', { data: user });
  return data;
};
