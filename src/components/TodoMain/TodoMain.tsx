import { Box } from '@mui/material';
import TodoForm from '../TodoForm/TodoForm';
import TodoList from '../TodoList/TodoList';
import TodoListFooter from '../TodoListFooter/TodoListFooter';
import styles from './TodoMain.module.scss';
import { useSelector } from 'react-redux';
import { selectFilteredTodos } from '../../store/todoSelectors';
import { useEffect } from 'react';

const TodoMain: React.FC = () => {
  const filteredTodos = useSelector(selectFilteredTodos);

  useEffect(() => {
    console.log(filteredTodos);
  }, [filteredTodos]);

  return (
    <Box component="main" className={styles.main}>
      <TodoForm />

      <TodoList todos={filteredTodos} />

      <TodoListFooter />
    </Box>
  );
};

export default TodoMain;
