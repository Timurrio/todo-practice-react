import { useState } from 'react';
import type { Todo } from '../../types/todo';
import { Checkbox, IconButton, ListItem, Typography } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TodoEditTextField from '../TodoEditTextField/TodoEditTextField';

import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '../../store/todoSlice/todoService';
import type { UserState } from '../../store/userSlice/userSlice';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

interface TodoListItemProps {
  todo: Todo;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo }) => {
  const [isEditMode, setisEditMode] = useState<boolean>(false);
  const { user } = useSelector<RootState, UserState>((state) => state.user);

  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  function handleDelete() {
    user && deleteTodo({ id: todo.id, userId: user.id });
  }

  function handleToggle() {
    updateTodo({
      id: todo.id,
      text: todo.text,
      completed: !todo.completed,
      userId: todo.userId,
    });
  }

  return (
    <ListItem
      divider
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        padding: '0px',
        minHeight: '70px',
        '& .todo-text': {
          textDecoration: todo.completed ? 'line-through' : 'none',
        },
        '& .delete-btn': {
          opacity: 0,
          transition: 'opacity 0.2s',
        },
        '&:hover .delete-btn': {
          opacity: 1,
        },
      }}
      onDoubleClick={() => setisEditMode(true)}
    >
      {isEditMode ? (
        <TodoEditTextField setIsInEditMode={setisEditMode} todo={todo} />
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
            name="todoItem-toggleCompleted"
          />

          <Typography
            variant="body1"
            className="todo-text"
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
