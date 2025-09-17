import { useMemo } from "react"
import { useTodos } from "../TodoContextProvider/TodoContextProvider"
import styles from "./TodoListFooter.module.scss"

export default function TodoListFooter() {
  const {todos} = useTodos()

  const activeTodos = useMemo(() => todos.filter((todo) => todo.completed === false).length, [todos])

  if(todos.length >= 1)
    return (
      <div className={styles.container}>
        <p className={styles.active_left}>{activeTodos} tasks left!</p>

              <div className= {styles.filters}>
                  <button data-filter="all" className= {`${styles.filter_button}  ${styles.active}`}>All</button>
                  <button data-filter="active" className= {styles.filter_button}>Active</button>
                  <button data-filter="completed" className= {styles.filter_button}>Completed</button>
              </div>

        <button className={styles.clear_completed}>Clear completed</button>
      </div>
    )
}
