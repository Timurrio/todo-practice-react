import TodoHeader from '../../components/TodoHeader/TodoHeader';
import TodoMain from '../../components/TodoMain/TodoMain';
import styles from './TodoPage.module.scss';

const TodoPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <TodoHeader />
      <TodoMain />
    </div>
  );
};

export default TodoPage;
