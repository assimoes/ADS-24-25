import React from 'react';

function TodoItem ({todo, deleteTodo, toggleComplete}) {
  return (
    <div>
      <span style={{textDecoration: todo.completed ? 'line-through': 'none'}}>
        {todo.title}
      </span>
      <button onClick={() => toggleComplete(todo.id)}>Complete</button>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  )
}


export default TodoItem