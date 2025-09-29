import { useMemo } from 'react';
import Filters from '../../types/filters';
import { Box, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../../store';
import {
  clearCompletedTodosRequest,
  setFilter,
  type TodoState,
} from '../../store/todoSlice/todoSlice';

const TodoListFooter: React.FC = () => {
  const { items: todos, filter } = useSelector<RootState, TodoState>(
    (state) => state.todos
  );

  const dispatch = useAppDispatch();

  const activeTodos = useMemo(
    () => todos.filter((todo) => todo.completed === false).length,
    [todos]
  );

  function handleClearCompleted() {
    const todosToDelete = todos.filter((todo) => todo.completed === true);
    dispatch(clearCompletedTodosRequest(todosToDelete));
  }

  if (todos.length >= 1)
    return (
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 15px',
          backgroundColor: 'white',
        }}
      >
        <Typography component={'p'} sx={{}}>
          {activeTodos} tasks left!
        </Typography>

        <Box>
          {Object.values(Filters).map((value) => (
            <Button
              disableRipple
              key={value}
              variant="text"
              onClick={() => dispatch(setFilter(value))}
              disabled={filter === value}
              sx={{
                margin: '0px 7px',
                textTransform: 'capitalize',
                color: 'black',
                transition: 'boxShadow 0.2s',
                boxShadow:
                  filter === value
                    ? '0 0 5px 2px rgba(184, 63, 69, 0.85)'
                    : 'none',
                '&:hover': {
                  background: 'none',
                  outline: '2px solid rgba(184, 63, 69, 0.75)',
                },
                '&:disabled': {
                  color: 'gray',
                },
              }}
            >
              {value}
            </Button>
          ))}
        </Box>

        <Button
          disableRipple
          sx={{
            textTransform: 'none',
            color: 'black',
            '&:hover': {
              background: 'none',
              textDecoration: 'underline',
            },
            '&:focus': {
              boxShadow: '0 0 5px 2px rgba(184, 63, 69, 0.85)',
            },
          }}
          onClick={handleClearCompleted}
        >
          Clear completed
        </Button>
      </Box>
    );
};

export default TodoListFooter;
