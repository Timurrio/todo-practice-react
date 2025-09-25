import TodoHeader from '../../components/TodoHeader/TodoHeader';
import TodoMain from '../../components/TodoMain/TodoMain';
import { useAppDispatch } from '../../store';
import { useEffect, useState } from 'react';
import { fetchTodosRequest } from '../../store/todoSlice';
import { Box } from '@mui/material';
import AuthForm from '../../components/AuthForm/AuthForm';
import { AuthModal } from '../../components/AuthModal/AuthModal';
import { initializeAuthRequest } from '../../store/userSlice';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store';

const TodoPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useSelector((state: RootState) => state.user);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    dispatch(initializeAuthRequest());
  }, []);

  useEffect(() => {
    if (!loading) {
      if (user) {
        dispatch(fetchTodosRequest());
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    }
  }, [user, loading]);

  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      {isVisible && <AuthModal setIsVisible={setIsVisible} />}
      <TodoHeader />
      <TodoMain />
    </Box>
  );
};

export default TodoPage;
