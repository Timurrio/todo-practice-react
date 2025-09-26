import { useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../../store';
import {
  logout,
  setIsModalVisible,
  type UserState,
} from '../../store/userSlice';
import { Box, Button, Typography } from '@mui/material';

const UserMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading, token, error } = useSelector<RootState, UserState>(
    (state) => state.user
  );

  return (
    <Box
      sx={{
        width: '50%',
        backgroundColor: 'white',
        padding: '25px 15px',
        margin: '25px 0px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {!user || loading ? (
        <Button
          variant="outlined"
          sx={{ margin: '0 auto auto' }}
          onClick={() => dispatch(setIsModalVisible(true))}
        >
          Login
        </Button>
      ) : (
        <>
          <Typography component={'p'}>
            Hello,
            <Typography
              component={'b'}
              sx={{
                fontWeight: '800',
                padding: '0 5px',
                color: 'rgb(184, 63, 69)',
              }}
            >
              {user?.name}
            </Typography>
            Email:
            <Typography
              component={'b'}
              sx={{
                fontWeight: '800',
                padding: '0 5px',
                color: 'rgb(184, 63, 69)',
              }}
            >
              {user?.email}
            </Typography>
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={() => dispatch(logout())}
            sx={{ marginLeft: 'auto' }}
          >
            Logout
          </Button>
        </>
      )}
    </Box>
  );
};

export default UserMenu;
