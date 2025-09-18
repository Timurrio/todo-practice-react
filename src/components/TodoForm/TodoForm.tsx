import { useMemo, useState } from 'react';
import { useTodos } from '../TodoContextProvider/TodoContextProvider';
import styles from './TodoForm.module.scss';
import type { Todo } from '../../types/todo';

export default function TodoForm() {
  const { todos, filter, filteredTodos, setTodos } = useTodos();
  const [inputValue, setInputValue] = useState<string>('');
  // const [isChecked, setIsChecked] = useState<boolean>(false);

  const isChecked = useMemo(() => {
    switch (filter) {
      case 'all':
        if (todos.some((td) => td.completed === false)) {
          return false;
        } else {
          return true;
        }
      case 'active':
        return false;
      case 'completed':
        return true;
    }
  }, [todos, filter]);

  const isToggleAllVisible = useMemo(
    () => (filteredTodos.length > 0 ? true : false),
    [filteredTodos]
  );

  function handleToggleAll() {
    console.log('handleToggleAll');
    switch (filter) {
      case 'all':
        setTodos((prevTodos) => {
          const isAllChecked = !prevTodos.some((td) => td.completed === false);
          if (isAllChecked) {
            return prevTodos.map((td) => ({ ...td, completed: false }));
          } else {
            return prevTodos.map((td) => ({ ...td, completed: true }));
          }
        });
        break;
      case 'active':
        setTodos((prevTodos) =>
          prevTodos.map((todo) => {
            const isInFiltered = filteredTodos.some((td) => td.id === todo.id);
            if (isInFiltered) {
              return { ...todo, completed: true };
            }
            return todo;
          })
        );
        break;
      case 'completed':
        setTodos((prevTodos) =>
          prevTodos.map((todo) => {
            const isInFiltered = filteredTodos.some((td) => td.id === todo.id);
            if (isInFiltered) {
              return { ...todo, completed: false };
            }
            return todo;
          })
        );
        break;
    }
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      setTodos((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: inputValue.trim(),
          completed: false,
        },
      ]);
    }
    setInputValue('');
  }

  return (
    <form
      id="todoForm"
      className={styles.todo_form}
      onSubmit={handleFormSubmit}
    >
      {isToggleAllVisible && (
        <label id="toggleAllLabel" className={styles.toggle_all_wrapper}>
          <input
            type="checkbox"
            id="toggleAll"
            onChange={handleToggleAll}
            checked={isChecked}
            className={styles.toggle_all}
          />
          <span className={styles.toggle_all_checkmark}></span>
        </label>
      )}

      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        id="inputTodo"
        className={styles.input_todo}
        type="text"
        placeholder="What needs to be done?"
      />
    </form>
  );
}
