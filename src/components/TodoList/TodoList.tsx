import type { todo } from "../../types/todo"
import TodoListItem from "../TodoListItem/TodoListItem"

interface TodoListProps {
    todos: todo[]
}

export const TodoList: React.FC<TodoListProps> = ({todos}) => {
  return (
    <ul>
        {
            todos.map( (todo) => <TodoListItem key={todo.id} todo={todo}/>)
        }
    </ul>
  )
}
