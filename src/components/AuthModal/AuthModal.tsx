import { Box, Button, capitalize, Typography } from '@mui/material';
import AuthForm from '../AuthForm/AuthForm';
import type { AuthMode } from '../../types/AuthMode';
import { useMemo, useState } from 'react';
import { login, register } from '../../api/userApi';

interface AuthModalProps {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthModal: React.FC<AuthModalProps> = ({ setIsVisible }) => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const onSubmitFunction = useMemo(
    () => (authMode === 'login' ? login : register),
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
        <AuthForm mode={authMode} onSubmit={onSubmitFunction} />
        <Button
          variant="text"
          sx={{ marginTop: '25px' }}
          onClick={() =>
            setAuthMode((prev) => {
              return prev === 'login' ? 'register' : 'login';
            })
          }
        >
          {authMode === 'login'
            ? 'I don`t have an account yet'
            : 'I already have an account'}
        </Button>
      </Box>
    </Box>
  );
};
