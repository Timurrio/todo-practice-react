import { useState } from "react"
import { useTodos } from "../TodoContextProvider/TodoContextProvider"
import styles from "./TodoForm.module.scss"

export default function TodoForm() {
  const {todos, setTodos} = useTodos()
  const [inputValue, setInputValue] = useState("")


  function handleFormSubmit(e: React.FormEvent){
     e.preventDefault()
     if(inputValue.trim() !== ""){
       setTodos( prev => [...prev, {id: Date.now().toString(), text: inputValue.trim(), completed: false}])
     }
     setInputValue("")
  }

  return (
    <form id="todoForm" className={styles.todo_form} onSubmit={handleFormSubmit}>

            <label id="toggleAllLabel" className={styles.toggle_all_wrapper}>
                <input type="checkbox" id="toggleAll" className={styles.toggle_all}/>
                <span className={styles.toggle_all_checkmark}></span>
            </label>  

            <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} id="inputTodo" className={styles.input_todo} type="text" placeholder="What needs to be done?"/>
    </form>
  )
}
