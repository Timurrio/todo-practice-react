import { useMemo, useState } from 'react';
import { TextField, Box, InputAdornment } from '@mui/material';
import ToggleAllButton from '../ToggleAllButton/ToggleAllButton';
import getToggleAllTodos from '../../functions/getToggleAllTodos';
import { type RootState } from '../../store';
import { useSelector } from 'react-redux';

import type { UserState } from '../../store/userSlice/userSlice';
import { useFilteredTodos } from '../../hooks/useFilteredTodos';
import {
  useCreateTodoMutation,
  useGetTodosQuery,
} from '../../store/todoSlice/todoService';
import { useToggleAllTodosMutation } from '../../store/todoSlice/todoService';
import type { TodoState } from '../../store/todoSlice/todoSlice';

const TodoForm: React.FC = () => {
  const { filter } = useSelector<RootState, TodoState>((state) => state.todos);
  const { user } = useSelector<RootState, UserState>((state) => state.user);
  const { data: todos } = useGetTodosQuery(user?.id!, { skip: !user });

  const [toggleAllTodos] = useToggleAllTodosMutation();
  const [createTodo] = useCreateTodoMutation();
  const { filteredTodos } = useFilteredTodos(user?.id);
  const [inputValue, setInputValue] = useState<string>('');

  const isChecked = useMemo(() => {
    switch (filter) {
      case 'all':
        return todos ? !todos.some((td) => td.completed === false) : false;
      case 'active':
        return false;
      case 'completed':
        return true;
    }
  }, [todos, filter]);

  const isToggleAllVisible = useMemo(
    () => filteredTodos.length > 0,
    [filteredTodos]
  );

  const handleToggleAll = () => {
    if (todos && user) {
      const toggledTodos = getToggleAllTodos(todos, filter, filteredTodos);
      toggleAllTodos({ todos: toggledTodos, userId: user.id });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() !== '' && user) {
      createTodo({
        completed: false,
        text: inputValue.trim(),
        userId: user.id,
      });
    }
    setInputValue('');
  };

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
