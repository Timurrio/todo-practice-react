import TodoHeader from '../../components/TodoHeader/TodoHeader';
import TodoMain from '../../components/TodoMain/TodoMain';
import { useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store';
import UserMenu from '../../components/UserMenu/UserMenu';
import { useNavigate } from 'react-router-dom';

const TodoPage: React.FC = () => {
  const navigate = useNavigate();

  const { user, isLoading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate('/');
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
