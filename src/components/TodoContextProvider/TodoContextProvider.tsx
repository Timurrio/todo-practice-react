import React, { createContext, useContext, useEffect, useState } from "react"
import type { todo } from "../../types/todo"


interface TodoContextType {
  todos: todo[]
  setTodos: React.Dispatch<React.SetStateAction<todo[]>>
}

const TodoContext = createContext<TodoContextType | undefined>(undefined)

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [todos, setTodos] = useState<todo[]>(() => {
    const saved = localStorage.getItem("todos")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
    console.log(localStorage.getItem("todos"))
  }, [todos])

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodos = () => {
  const ctx = useContext(TodoContext)
  if (!ctx) {
    throw new Error("useTodos must be used within TodoProvider")
  }
  return ctx
}
