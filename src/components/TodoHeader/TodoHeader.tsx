import { Box, Typography } from '@mui/material';

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
      <Typography
        component="h1"
        sx={{
          color: '#b83f45',
          fontSize: '80px',
          fontWeight: 200,
        }}
      >
        todos
      </Typography>
    </Box>
  );
};

export default TodoHeader;
