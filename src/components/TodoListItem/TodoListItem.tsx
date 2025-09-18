import type { Todo } from '../../types/todo';
import { useTodos } from '../TodoContextProvider/TodoContextProvider';
import styles from './TodoListItem.module.scss';

interface TodoListItemProps {
  todo: Todo;
}

export default function TodoListItem({ todo }: TodoListItemProps) {
  const { todos, setTodos } = useTodos();

  function handleDelete() {
    setTodos((prev) => prev.filter((td) => td.id !== todo.id));
  }

  function handleToggle() {
    setTodos((prev) =>
      prev.map((td) =>
        td.id === todo.id ? { ...todo, completed: !todo.completed } : td
      )
    );
    console.log(todos);
  }

  return (
    <li className={`${styles.todo_item} ${todo.completed && styles.completed}`}>
      <label className={styles.todo_checkbox_wrapper}>
        <input
          type="checkbox"
          className={styles.todo_checkbox}
          checked={todo.completed}
          onChange={handleToggle}
        />
        <span className={styles.todo_checkmark}></span>
      </label>

      <span className={styles.todo_text}>{todo.text}</span>
      <button onClick={handleDelete} className={styles.todo_delete}>
        X
      </button>
    </li>
  );
}
