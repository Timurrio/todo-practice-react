import type { Todo } from '../types/todo';

function getToggleAllTodos(
  todos: Todo[],
  filter: 'all' | 'active' | 'completed',
  filteredTodos: Todo[]
): Todo[] {
  switch (filter) {
    case 'all': {
      const isAllChecked = !todos.some((td) => td.completed === false);
      return todos.map((td) => ({ ...td, completed: !isAllChecked }));
    }
    case 'active': {
      return todos.map((todo) => {
        const isInFiltered = filteredTodos.some((td) => td.id === todo.id);
        if (isInFiltered) {
          return { ...todo, completed: true };
        }
        return todo;
      });
    }
    case 'completed': {
      return todos.map((todo) => {
        const isInFiltered = filteredTodos.some((td) => td.id === todo.id);
        if (isInFiltered) {
          return { ...todo, completed: false };
        }
        return todo;
      });
    }
    default:
      return todos;
  }
}

export default getToggleAllTodos;
