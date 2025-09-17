import TodoHeader from "../../components/TodoHeader/TodoHeader"
import TodoMain from "../../components/TodoMain/TodoMain"
import styles from "./TodoPage.module.scss"

export default function TodoPage() {
  return (
    <div className={styles.container}>
        <TodoHeader/>
        <TodoMain/>
    </div>
  )
}
