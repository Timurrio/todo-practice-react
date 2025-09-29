export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type UserWithoutPassword = Omit<User, 'password'>;
