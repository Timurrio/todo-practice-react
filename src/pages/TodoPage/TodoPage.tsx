import TodoHeader from '../../components/TodoHeader/TodoHeader';
import TodoMain from '../../components/TodoMain/TodoMain';
import styles from './TodoPage.module.scss';
import { useAppDispatch } from '../../store';
import { useEffect } from 'react';
import { fetchTodosRequest } from '../../store/todoSlice';

const TodoPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodosRequest());
  }, []);

  return (
    <div className={styles.container}>
      <TodoHeader />
      <TodoMain />
    </div>
  );
};

export default TodoPage;
