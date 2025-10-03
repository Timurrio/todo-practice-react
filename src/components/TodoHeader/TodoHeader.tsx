import { Box } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const MainHeader = styled('h1')({
  color: '#b83f45',
  fontSize: '80px',
  fontWeight: 200,
});

const TodoHeader: React.FC = () => {
  return (
    <Box
      component="header"
      sx={{
        width: '100%',
        textAlign: 'center',
        padding: '30px 0',
      }}
    >
      <MainHeader>todos</MainHeader>
    </Box>
  );
};

export default React.memo(TodoHeader);
