
import React from 'react';
import TodoItem from './TodoItem';
import { useTodosContext } from '../context/TodosContext';

function TodoList() {
  const { todos, deleteTodo, toggleComplete } = useTodosContext()
  return (
    <div>
      {todos.length === 0 ? (
        <p>No TODOS available</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleComplete={toggleComplete}
          />
        ))
      )}
    </div>
  );
}

export default TodoList;
