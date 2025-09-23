import { useMemo } from 'react';
import { useTodos } from '../TodoContextProvider/TodoContextProvider';
import styles from './TodoListFooter.module.scss';
import Filters from '../../types/filters';
import { Box, Button, Typography } from '@mui/material';
import { clearCompletedTodos } from '../../api/todoApi';

const TodoListFooter: React.FC = () => {
  const { todos, setTodos, filter, setFilter } = useTodos();

  const activeTodos = useMemo(
    () => todos.filter((todo) => todo.completed === false).length,
    [todos]
  );

  function handleClearCompleted() {
    const todosToDelete = todos.filter((todo) => todo.completed === true);
    setTodos((prev) => prev.filter((todo) => todo.completed === false));
    clearCompletedTodos(todosToDelete);
  }

  if (todos.length >= 1)
    return (
      <Box className={styles.container}>
        <Typography component={'p'} sx={{}}>
          {activeTodos} tasks left!
        </Typography>

        <Box className={styles.filters}>
          {Object.values(Filters).map((value) => (
            <Button
              disableRipple
              key={value}
              variant="text"
              onClick={() => setFilter(value)}
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
