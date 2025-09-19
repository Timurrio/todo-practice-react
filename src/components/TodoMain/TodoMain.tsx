import { Box } from '@mui/material';
import { useTodos } from '../TodoContextProvider/TodoContextProvider';
import TodoForm from '../TodoForm/TodoForm';
import TodoList from '../TodoList/TodoList';
import TodoListFooter from '../TodoListFooter/TodoListFooter';
import styles from './TodoMain.module.scss';

const TodoMain: React.FC = () => {
  const { filteredTodos } = useTodos();

  return (
    <Box component="main" className={styles.main}>
      <TodoForm />

      <TodoList todos={filteredTodos} />

      <TodoListFooter />
    </Box>
  );
};

export default TodoMain;
