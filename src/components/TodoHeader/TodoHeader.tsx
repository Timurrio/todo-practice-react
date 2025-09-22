import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

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
      {/* <Typography
        component="h1"
        sx={{
          color: '#b83f45',
          fontSize: '80px',
          fontWeight: 200,
        }}
      >
        todos
      </Typography> */}
      <MainHeader>todos</MainHeader>
    </Box>
  );
};

export default TodoHeader;
