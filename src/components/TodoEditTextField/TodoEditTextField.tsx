import { TextField } from '@mui/material';
import type { Todo } from '../../types/todo';
import { useState } from 'react';

import { useUpdateTodoMutation } from '../../store/todoSlice/todoService';

interface TodoEditTextFieldProps {
  todo: Todo;
  setIsInEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoEditTextField: React.FC<TodoEditTextFieldProps> = ({
  todo,
  setIsInEditMode,
}) => {
  const [inputValue, setInputValue] = useState<string>(todo.text);
  const [updateTodo] = useUpdateTodoMutation();

  function handleChangeText(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      if (inputValue.trim() !== '') {
        updateTodo({
          id: todo.id,
          text: inputValue.trim(),
          completed: todo.completed,
          userId: todo.userId,
        });
        setIsInEditMode(false);
      }
    } else if (e.key === 'Escape') {
      setIsInEditMode(false);
    }
  }

  function handleInputBlur() {
    setIsInEditMode(false);
    setInputValue(todo.text);
  }

  return (
    <TextField
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={handleInputBlur}
      onKeyDown={(e) => handleChangeText(e)}
      size="small"
      autoFocus
      variant="standard"
      fullWidth
      slotProps={{
        input: {
          disableUnderline: true,
        },
      }}
      sx={{
        minHeight: '70px',
        boxShadow: '0 0 2px 2px rgba(184, 63, 69, 0.85)',
        padding: '0px 0px 0px 55px',
        zIndex: 2,

        '& .MuiInputBase-input': {
          padding: '20px 0px',
          fontSize: '20px',
        },
      }}
    />
  );
};

export default TodoEditTextField;
