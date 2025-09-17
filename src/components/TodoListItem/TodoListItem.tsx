import type { todo } from "../../types/todo"


interface TodoListItemProps {
    todo: todo
}

export default function TodoListItem({todo}: TodoListItemProps) {
  return (
    <div>{todo.text}</div>
  )
}
