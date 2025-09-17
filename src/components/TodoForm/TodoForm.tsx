import { useState } from "react"
import { useTodos } from "../TodoContextProvider/TodoContextProvider"

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
    <form id="todoForm" className="todo-form" onSubmit={handleFormSubmit}>

            <label id="toggleAllLabel" className="toggle-all-wrapper">
                <input type="checkbox" id="toggleAll" className="toggle-all"/>
                <span className="toggle-all-checkmark"></span>
            </label>  

            <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} id="inputTodo" className="input-todo" type="text" placeholder="What needs to be done?"/>
    </form>
  )
}
