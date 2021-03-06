import React, { useReducer, useRef, useEffect, useContext } from 'react';
import ThemeContext from '../context/themeContext';
import todoReducer, { initialState } from '../reducer/todoReducer';

export default function Todos() {
  const inputRef = useRef();
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { theme } = useContext(ThemeContext);
  const title = state.todos.length > 0 ? `${state.todos.length} Todos` : 'Nothing To Do!';

  const completedTodos = state.todos.filter((todo) => {
    return todo.completed;
  });

  useEffect(() => {
    document.title = `You have ${completedTodos.length} items completed!`;
  });

  function addTodo(event) {
    event.preventDefault();
    // add TDS1
    dispatch({
      type: 'ADD_TODO',
      payload: {
        id: state.todos.length ? state.todos.length + 1 : 0,
        title: inputRef.current.value,
        completed: false,
      },
    });
    inputRef.current.value = '';
  }

  function toggleComplete(id) {
    // add TDS2
    dispatch({ type: 'TOGGLE_TODO', payload: { id } });
  }
  function deleteTodo(id) {
    // add TDS3
    dispatch({ type: 'REMOVE_TODO', payload: { id } });
  }
  const themeClass = theme.background === '#222222' ? 'dark-theme' : 'light-theme';
  return (
    <div className='todo-app'>
      <div>
        <form onSubmit={addTodo}>
          <input className={themeClass} ref={inputRef} type='text' id='add-todo' placeholder='Add Todo...' />
        </form>
      </div>
      <h1>{title}</h1>

      <ul className='list-wrapper'>
        {state.todos.map((todo) => (
          <li className={`${themeClass} todo-item`} key={todo.id}>
            <span className={todo.completed ? 'todo-complete' : ''} onDoubleClick={() => toggleComplete(todo.id)}>
              {todo.title}
            </span>
            <div className={`${themeClass} todo-delete`} onClick={() => deleteTodo(todo.id)}>
              <span>x</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
