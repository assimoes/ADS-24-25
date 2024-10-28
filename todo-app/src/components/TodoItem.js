import React from 'react';

function TodoItem ({todo, deleteTodo, toggleComplete}) {
  return (
    <div style={{textDecoration: todo.completed ? 'line-through': 'none'}}>
      <span>{todo.title}</span>
      <button onClick={() => toggleComplete(todo.id)}>Complete</button>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  )
}


export default TodoItem