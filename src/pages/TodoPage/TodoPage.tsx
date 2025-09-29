import TodoHeader from '../../components/TodoHeader/TodoHeader';
import TodoMain from '../../components/TodoMain/TodoMain';
import { useAppDispatch } from '../../store';
import { useEffect } from 'react';
import { fetchTodosRequest } from '../../store/todoSlice/todoSlice';
import { Box, CircularProgress } from '@mui/material';
import { AuthModal } from '../../components/AuthModal/AuthModal';
import {
  initializeAuthRequest,
  setIsModalVisible,
} from '../../store/userSlice/userSlice';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store';
import UserMenu from '../../components/UserMenu/UserMenu';

const TodoPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading, isModalVisible } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(initializeAuthRequest());
  }, []);

  useEffect(() => {
    if (!loading) {
      if (user) {
        dispatch(fetchTodosRequest(user.id));
        dispatch(setIsModalVisible(false));
      } else {
        dispatch(setIsModalVisible(true));
      }
    }
  }, [user, loading]);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {!loading && isModalVisible && <AuthModal />}
      <TodoHeader />
      <UserMenu />
      {loading || !user ? (
        <CircularProgress size={60} color="error" />
      ) : (
        <TodoMain />
      )}
    </Box>
  );
};

export default TodoPage;
