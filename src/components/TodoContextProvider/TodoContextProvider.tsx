import React, { createContext, useContext, useEffect, useState } from "react"
import type { Todo } from "../../types/todo"


interface TodoContextType {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoContext = createContext<TodoContextType | undefined>(undefined)

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
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
