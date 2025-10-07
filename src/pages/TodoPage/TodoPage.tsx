import TodoHeader from '../../components/TodoHeader/TodoHeader';
import TodoMain from '../../components/TodoMain/TodoMain';
import { useAppDispatch } from '../../store';
import { useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { AuthModal } from '../../components/AuthModal/AuthModal';
import { setIsModalVisible } from '../../store/userSlice/userSlice';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store';
import UserMenu from '../../components/UserMenu/UserMenu';

const TodoPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { isModalVisible, user, isLoading } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        dispatch(setIsModalVisible(false));
      } else {
        dispatch(setIsModalVisible(true));
      }
    }
  }, [user]);

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
      {!isLoading && isModalVisible && <AuthModal />}
      <TodoHeader />
      <UserMenu />
      {isLoading || !user ? (
        <CircularProgress size={60} color="error" />
      ) : (
        <TodoMain />
      )}
    </Box>
  );
};

export default TodoPage;
