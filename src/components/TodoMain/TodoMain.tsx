import { useTodos } from "../TodoContextProvider/TodoContextProvider"
import TodoForm from "../TodoForm/TodoForm"
import { TodoList } from "../TodoList/TodoList"
import TodoListFooter from "../TodoListFooter/TodoListFooter"
import styles from "./TodoMain.module.scss"


export default function TodoMain() {
  const {todos, setTodos} = useTodos()

  return (
    <main className={styles.main}>
        <TodoForm/>

        <TodoList todos={todos}/>

        <TodoListFooter/>
    </main>
  )
}
