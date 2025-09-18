import { useState } from 'react';
import type { Todo } from '../../types/todo';
import { useTodos } from '../TodoContextProvider/TodoContextProvider';
import styles from './TodoListItem.module.scss';

interface TodoListItemProps {
  todo: Todo;
}

export default function TodoListItem({ todo }: TodoListItemProps) {
  const { setTodos } = useTodos();
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(todo.text);

  function handleDelete() {
    setTodos((prev) => prev.filter((td) => td.id !== todo.id));
  }

  function handleToggle() {
    setTodos((prev) =>
      prev.map((td) =>
        td.id === todo.id ? { ...todo, completed: !todo.completed } : td
      )
    );
  }

  function handleChangeText(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      if (inputValue.trim() !== '') {
        setTodos((prevTodos) => {
          return prevTodos.map<Todo>((td) => {
            return td.id === todo.id
              ? { ...todo, text: inputValue.trim() }
              : td;
          });
        });
      }
      setIsInEditMode(false);
    } else if (e.key === 'Escape') {
      setIsInEditMode(false);
    }
  }

  function handleInputBlur() {
    setIsInEditMode(false);
    setInputValue(todo.text);
  }

  return (
    <li
      onDoubleClick={() => setIsInEditMode(true)}
      className={`${styles.todo_item} ${todo.completed && styles.completed}`}
    >
      {isInEditMode ? (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={styles.todo_edit}
          autoFocus
          onBlur={handleInputBlur}
          onKeyDown={handleChangeText}
        />
      ) : (
        <>
          <label className={styles.todo_checkbox_wrapper}>
            <input
              type="checkbox"
              className={styles.todo_checkbox}
              checked={todo.completed}
              onChange={handleToggle}
            />
            <span className={styles.todo_checkmark}></span>
          </label>

          <span className={styles.todo_text}>{todo.text}</span>

          <button onClick={handleDelete} className={styles.todo_delete}>
            X
          </button>
        </>
      )}
    </li>
  );
}
