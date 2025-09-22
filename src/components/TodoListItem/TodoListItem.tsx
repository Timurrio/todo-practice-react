import { useState } from 'react';
import type { Todo } from '../../types/todo';
import { useTodos } from '../TodoContextProvider/TodoContextProvider';
import { Checkbox, IconButton, ListItem, Typography } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TodoEditTextField from '../TodoEditTextField/TodoEditTextField';

interface TodoListItemProps {
  todo: Todo;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo }) => {
  const { setTodos } = useTodos();
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);

  function handleDelete() {
    setTodos((prev) => prev.filter((td) => td.id !== todo.id));
  }

  function handleToggle() {
    setTodos((prev) =>
      prev.map((td) =>
        td.id === todo.id ? { ...todo, completed: !todo.completed } : td
      )
    );
  }

  return (
    <ListItem
      divider
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        textDecoration: todo.completed ? 'line-through' : 'none',
        padding: '0px',
        minHeight: '70px',
        '& .delete-btn': {
          opacity: 0,
          transition: 'opacity 0.2s',
        },
        '&:hover .delete-btn': {
          opacity: 1,
        },
      }}
      onDoubleClick={() => setIsInEditMode(true)}
    >
      {isInEditMode ? (
        <TodoEditTextField setIsInEditMode={setIsInEditMode} todo={todo} />
      ) : (
        <>
          <Checkbox
            checked={todo.completed}
            onChange={handleToggle}
            icon={
              <RadioButtonUncheckedIcon
                sx={{ fontSize: 28, color: 'grey.500' }}
              />
            }
            checkedIcon={
              <CheckCircleOutlineIcon sx={{ fontSize: 28, color: 'green' }} />
            }
            disableRipple
          />

          <Typography
            variant="body1"
            sx={{
              flex: 1,
              color: todo.completed ? 'text.secondary' : 'text.primary',
              fontSize: '20px',
              wordBreak: 'break-all',
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            {todo.text}
          </Typography>

          <IconButton
            onClick={handleDelete}
            color="default"
            aria-label="delete"
            className="delete-btn"
            disableRipple
            sx={{
              color: 'gray',
              padding: '0 20px',
              transition: 'color 0.2s',
              '&:hover': {
                backgroundColor: 'transparent',
                color: '#b83f45',
              },
            }}
          >
            X
          </IconButton>
        </>
      )}
    </ListItem>
  );
};

export default TodoListItem;
