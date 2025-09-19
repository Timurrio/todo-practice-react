import type { Todo } from '../../types/todo';
import TodoListItem from '../TodoListItem/TodoListItem';
import styles from './TodoList.module.scss';
import { List } from '@mui/material';

interface TodoListProps {
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <List className={styles.todo_list} sx={{ padding: '0' }}>
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </List>
  );
};

export default TodoList;
