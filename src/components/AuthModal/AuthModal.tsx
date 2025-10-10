import { Box, Button, capitalize, Typography } from '@mui/material';
import type { AuthMode } from '../../types/AuthMode';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, type RootState } from '../../store';
import { clearError, type UserState } from '../../store/userSlice/userSlice';
import { useSelector } from 'react-redux';
import {
  useLoginMutation,
  useRegisterMutation,
} from '../../store/userSlice/userApi';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';

interface AuthModalProps {
  authMode: AuthMode;
}

export const AuthModal: React.FC<AuthModalProps> = ({ authMode }) => {
  const dispatch = useAppDispatch();
  const [login, { isSuccess: loginSuccess }] = useLoginMutation();
  const [register, { isSuccess: registerSuccess }] = useRegisterMutation();
  const navigate = useNavigate();
  const { isLoading, error, token } = useSelector<RootState, UserState>(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(clearError());
  }, []);

  const onSubmitFunction = useMemo(
    () =>
      authMode === 'login'
        ? (val: { email: string; password: string }) => login(val)
        : (val: { email: string; password: string; name: string }) =>
            register(val),
    [authMode]
  );

  useEffect(() => {
    if (loginSuccess || registerSuccess || token) {
      navigate('/todos');
    }
  }, [loginSuccess, registerSuccess, token, navigate]);

  if (isLoading) {
    return <></>;
  }

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
            navigate(authMode === 'login' ? '/register' : '/login');
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
