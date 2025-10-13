import ErrorPage from '../pages/ErrorPage/ErrorPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import TablePage from '../pages/TablePage/TablePage';
import TodoPage from '../pages/TodoPage/TodoPage';

enum routeNames {
  TODOS = '/todos',
  ERROR = '*',
  DEFAULT = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  TABLE = '/table',
}

export interface RouteInfo {
  path: string;
  element: React.ReactNode;
}

export const routes: RouteInfo[] = [
  {
    path: routeNames.DEFAULT,
    element: <LoginPage />,
  },
  {
    path: routeNames.TODOS,
    element: <TodoPage />,
  },

  {
    path: routeNames.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: routeNames.LOGIN,
    element: <LoginPage />,
  },
  {
    path: routeNames.TABLE,
    element: <TablePage />,
  },

  {
    path: routeNames.ERROR,
    element: <ErrorPage />,
  },
];
