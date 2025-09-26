import type { Todo } from '../../types/todo';
import TodoListItem from '../TodoListItem/TodoListItem';
import { List } from '@mui/material';

interface TodoListProps {
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <List sx={{ padding: '0', width: '100%', backgroundColor: 'white' }}>
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </List>
  );
};

export default TodoList;
