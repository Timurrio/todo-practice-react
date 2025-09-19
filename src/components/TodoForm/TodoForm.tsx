import { useMemo, useState } from 'react';
import { useTodos } from '../TodoContextProvider/TodoContextProvider';
import { TextField, Box, InputAdornment } from '@mui/material';
import IconButton from '@mui/material/IconButton';

const ToggleAllButton: React.FC<{
  handleFunction: () => void;
  isChecked: boolean;
}> = ({ handleFunction, isChecked }) => {
  return (
    <IconButton
      id="toggleAll"
      onClick={handleFunction}
      disableRipple
      sx={{
        height: '100%',
        width: '40px',
        padding: '0',
        fontSize: '1.5rem',
        color: isChecked ? 'text.primary' : 'text.disabled',
        transform: 'rotate(90deg)',
        transition: 'transform 0.2s',
        borderRadius: '0px',
        '&:focus': {
          'box-shadow': '0 0 2px 2px rgba(184, 63, 69, 0.85)',
        },
      }}
    >
      ❯
    </IconButton>
  );
};

const TodoForm: React.FC = () => {
  const { todos, filter, filteredTodos, setTodos } = useTodos();
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
    switch (filter) {
      case 'all':
        setTodos((prevTodos) => {
          const isAllChecked = !prevTodos.some((td) => td.completed === false);
          if (isAllChecked) {
            return prevTodos.map((td) => ({ ...td, completed: false }));
          } else {
            return prevTodos.map((td) => ({ ...td, completed: true }));
          }
        });
        break;
      case 'active':
        setTodos((prevTodos) =>
          prevTodos.map((todo) => {
            const isInFiltered = filteredTodos.some((td) => td.id === todo.id);
            if (isInFiltered) {
              return { ...todo, completed: true };
            }
            return todo;
          })
        );
        break;
      case 'completed':
        setTodos((prevTodos) =>
          prevTodos.map((todo) => {
            const isInFiltered = filteredTodos.some((td) => td.id === todo.id);
            if (isInFiltered) {
              return { ...todo, completed: false };
            }
            return todo;
          })
        );
        break;
    }
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      setTodos((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: inputValue.trim(),
          completed: false,
        },
      ]);
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
        width: '50%',
      }}
    >
      <TextField
        id="inputTodo"
        variant="filled"
        size="small"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        fullWidth
        sx={{
          '& .MuiInputBase-root.Mui-focused': {
            'box-shadow': '0 0 2px 2px rgba(184, 63, 69, 0.85)',
          },
          '& .MuiInputBase-root': {
            padding: '0',
            backgroundColor: 'white',
            height: '70px',
          },
          '&:hover': {
            background: 'none',
          },
        }}
        slotProps={{
          input: {
            startAdornment: isToggleAllVisible && (
              <InputAdornment
                position="start"
                sx={{ height: '100%', alignItems: 'stretch', p: 0, m: 0 }}
              >
                <ToggleAllButton
                  handleFunction={handleToggleAll}
                  isChecked={isChecked !== undefined ? isChecked : false}
                />
              </InputAdornment>
            ),
            disableUnderline: true,
          },
        }}
      />
    </Box>
  );
};

export default TodoForm;
