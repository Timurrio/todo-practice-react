import { useTodos } from '../TodoContextProvider/TodoContextProvider';
import TodoForm from '../TodoForm/TodoForm';
import { TodoList } from '../TodoList/TodoList';
import TodoListFooter from '../TodoListFooter/TodoListFooter';
import styles from './TodoMain.module.scss';

export default function TodoMain() {
  const { filteredTodos } = useTodos();

  return (
    <main className={styles.main}>
      <TodoForm />

      <TodoList todos={filteredTodos} />

      <TodoListFooter />
    </main>
  );
}
