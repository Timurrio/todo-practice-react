import { Box } from '@mui/material';
import TodoForm from '../TodoForm/TodoForm';
import TodoList from '../TodoList/TodoList';
import TodoListFooter from '../TodoListFooter/TodoListFooter';
import { useSelector } from 'react-redux';
import { useGetTodosQuery } from '../../store/todoSlice/todoService';
import type { RootState } from '../../store';
import type { UserState } from '../../store/userSlice/userSlice';

import { useFilteredTodos } from '../../hooks/useFilteredTodos';

const TodoMain: React.FC = () => {
  const { user } = useSelector<RootState, UserState>((state) => state.user);
  useGetTodosQuery(user?.id!, { skip: !user });
  const { filteredTodos } = useFilteredTodos(user?.id);

  return (
    <Box
      component="main"
      sx={{
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <TodoForm />

      <TodoList todos={filteredTodos} />

      <TodoListFooter />
    </Box>
  );
};

export default TodoMain;
