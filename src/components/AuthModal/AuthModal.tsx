import { Box, Button, capitalize, Typography } from '@mui/material';
import AuthForm from '../AuthForm/AuthForm';
import type { AuthMode } from '../../types/AuthMode';
import { useMemo, useState } from 'react';
import { useAppDispatch, type RootState } from '../../store';
import {
  clearError,
  setIsModalVisible,
  type UserState,
} from '../../store/userSlice/userSlice';
import { useSelector } from 'react-redux';
import {
  useLoginMutation,
  useRegisterMutation,
} from '../../store/userSlice/userApi';

export const AuthModal: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const { isLoading, error } = useSelector<RootState, UserState>(
    (state) => state.user
  );

  const onSubmitFunction = useMemo(
    () =>
      authMode === 'login'
        ? (val: { email: string; password: string }) => login(val)
        : (val: { email: string; password: string; name: string }) =>
            register(val),
    [authMode]
  );

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'rgba(0,0,0,0.5)',
        zIndex: '999',
      }}
      onClick={(e) => {
        e.preventDefault();
        dispatch(setIsModalVisible(false));
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'white',
          padding: '30px 20px',
          minWidth: '300px',
          width: '35vw',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography
          sx={{ marginBottom: '30px', fontSize: '40px', fontWeight: 'bold' }}
          component={'h4'}
        >
          {capitalize(authMode)}
        </Typography>
        <Typography component={'p'} color="error">
          {error}
        </Typography>
        <AuthForm mode={authMode} onSubmit={onSubmitFunction} />
        <Button
          variant="text"
          sx={{ marginTop: '25px' }}
          onClick={() => {
            dispatch(clearError());
            setAuthMode((prev) => {
              return prev === 'login' ? 'register' : 'login';
            });
          }}
        >
          {authMode === 'login'
            ? 'I don`t have an account yet'
            : 'I already have an account'}
        </Button>
      </Box>
    </Box>
  );
};
