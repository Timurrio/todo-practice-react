import type { Todo } from '../../types/todo';
import TodoListItem from '../TodoListItem/TodoListItem';
import styles from './TodoList.module.scss';

interface TodoListProps {
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <ul className={styles.todo_list}>
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
