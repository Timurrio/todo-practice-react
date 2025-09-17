import type { todo } from "../../types/todo"
import { useTodos } from "../TodoContextProvider/TodoContextProvider"
import styles from "./TodoListItem.module.scss"

interface TodoListItemProps {
    todo: todo
}

export default function TodoListItem({todo}: TodoListItemProps) {
  const {setTodos} = useTodos()

  function handleDelete(){
    setTodos( prev => prev.filter(td => td.id !== todo.id))
  }

  return (
    <li className={styles.todo_item}>
      
      <label className={styles.todo_checkbox_wrapper}>
        <input type="checkbox" className={styles.todo_checkbox}/>
        <span className={styles.todo_checkmark}></span>
      </label>

      <span className={styles.todo_text}>{todo.text}</span>
      <button onClick={handleDelete} className={styles.todo_delete}>X</button>
    </li>
  )
}
