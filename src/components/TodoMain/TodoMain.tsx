import { Box } from '@mui/material';
import TodoForm from '../TodoForm/TodoForm';
import TodoList from '../TodoList/TodoList';
import TodoListFooter from '../TodoListFooter/TodoListFooter';
import { useSelector } from 'react-redux';
import { selectFilteredTodos } from '../../store/todoSlice/todoSelectors';

const TodoMain: React.FC = () => {
  const filteredTodos = useSelector(selectFilteredTodos);

  return (
    <Box
      component="main"
      sx={{
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <TodoForm />

      <TodoList todos={filteredTodos} />

      <TodoListFooter />
    </Box>
  );
};

export default TodoMain;
