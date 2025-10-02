import Filters from '../types/filters';
import type { Todo } from '../types/todo';

export default function filterTodos(
  todos: Todo[] | undefined,
  filter: Filters
) {
  let filteredTodos: Todo[] = [];
  if (todos === undefined) {
    return [];
  }
  switch (filter) {
    case 'all':
      filteredTodos = todos;
      break;
    case 'active':
      filteredTodos = todos.filter((todo) => todo.completed === false);
      break;
    case 'completed':
      filteredTodos = todos.filter((todo) => todo.completed === true);
      break;
  }
  return filteredTodos;
}
