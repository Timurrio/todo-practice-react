import { useMemo, useState } from 'react';
import { TextField, Box, InputAdornment } from '@mui/material';
import ToggleAllButton from '../ToggleAllButton/ToggleAllButton';
import getToggleAllTodos from '../../functions/getToggleAllTodos';
import { useAppDispatch, type RootState } from '../../store';
import { useSelector } from 'react-redux';
import { selectFilteredTodos } from '../../store/todoSelectors';
import {
  createTodoRequest,
  toggleAllTodosRequest,
  type TodoState,
} from '../../store/todoSlice';

const TodoForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filter, items: todos } = useSelector<RootState, TodoState>(
    (state) => state.todos
  );
  const filteredTodos = useSelector(selectFilteredTodos);
  const [inputValue, setInputValue] = useState<string>('');

  const isChecked = useMemo(() => {
    switch (filter) {
      case 'all':
        if (todos.some((td) => td.completed === false)) {
          return false;
        } else {
          return true;
        }
      case 'active':
        return false;
      case 'completed':
        return true;
    }
  }, [todos, filter]);

  const isToggleAllVisible = useMemo(
    () => (filteredTodos.length > 0 ? true : false),
    [filteredTodos]
  );

  function handleToggleAll() {
    const toggledTodos = getToggleAllTodos(todos, filter, filteredTodos);
    dispatch(toggleAllTodosRequest(toggledTodos));
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      dispatch(
        createTodoRequest({ completed: false, text: inputValue.trim() })
      );
    }
    setInputValue('');
  }

  return (
    <Box
      component="form"
      onSubmit={handleFormSubmit}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        width: '100%',
        padding: 0,
      }}
    >
      <TextField
        id="inputTodo"
        variant="standard"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        fullWidth
        sx={{
          '& .MuiInputBase-root.Mui-focused': {
            boxShadow: '0 0 2px 2px rgba(184, 63, 69, 0.85)',
          },
          '& .MuiInputBase-root': {
            padding: '0',
            backgroundColor: 'white',
            height: '70px',
          },
          '&:hover': {
            background: 'none',
          },
          zIndex: 1,
          '& .MuiInputBase-input': {
            fontSize: '24px',
          },
        }}
        slotProps={{
          input: {
            startAdornment: isToggleAllVisible ? (
              <InputAdornment
                position="start"
                sx={{
                  height: '100%',
                  alignItems: 'stretch',
                  p: 0,
                  m: 0,
                }}
              >
                <ToggleAllButton
                  handleFunction={handleToggleAll}
                  isChecked={isChecked !== undefined ? isChecked : false}
                />
              </InputAdornment>
            ) : (
              <Box width={'40px'} />
            ),
            disableUnderline: true,
          },
        }}
      />
    </Box>
  );
};

export default TodoForm;
