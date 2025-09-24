import TodoHeader from '../../components/TodoHeader/TodoHeader';
import TodoMain from '../../components/TodoMain/TodoMain';
import { useAppDispatch } from '../../store';
import { useEffect } from 'react';
import { fetchTodosRequest } from '../../store/todoSlice';
import { Box } from '@mui/material';

const TodoPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodosRequest());
  }, []);

  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <TodoHeader />
      <TodoMain />
    </Box>
  );
};

export default TodoPage;
