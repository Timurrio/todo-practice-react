import { useMemo } from 'react';
import { useTodos } from '../TodoContextProvider/TodoContextProvider';
import styles from './TodoListFooter.module.scss';

export default function TodoListFooter() {
  const { todos, setTodos, filter, setFilter } = useTodos();

  const activeTodos = useMemo(
    () => todos.filter((todo) => todo.completed === false).length,
    [todos]
  );

  function handleClearCompleted() {
    setTodos((prev) => prev.filter((todo) => todo.completed === false));
  }

  if (todos.length >= 1)
    return (
      <div className={styles.container}>
        <p className={styles.active_left}>{activeTodos} tasks left!</p>

        <div className={styles.filters}>
          <button
            data-filter="all"
            onClick={() => setFilter('all')}
            className={`${styles.filter_button}  ${
              filter === 'all' && styles.active
            }`}
          >
            All
          </button>
          <button
            data-filter="active"
            onClick={() => setFilter('active')}
            className={`${styles.filter_button}  ${
              filter === 'active' && styles.active
            }`}
          >
            Active
          </button>
          <button
            data-filter="completed"
            onClick={() => setFilter('completed')}
            className={`${styles.filter_button}  ${
              filter === 'completed' && styles.active
            }`}
          >
            Completed
          </button>
        </div>

        <button
          className={styles.clear_completed}
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      </div>
    );
}
