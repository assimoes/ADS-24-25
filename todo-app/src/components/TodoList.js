
import React from 'react';
import TodoItem from './TodoItem';

import { useSelector, useDispatch } from 'react-redux';
import { deleteExistingTodo, toggleTodoComplete } from '../features/todosSlice';

function TodoList() {
  const todos  = useSelector((state) => state.todos.list)
  const dispatch = useDispatch()

  return (
    <div>
      {todos.length === 0 ? (
        <p>No TODOS available</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo= {() => dispatch(deleteExistingTodo(todo.id))}
            toggleComplete={() => {
              dispatch(toggleTodoComplete(todo.id))
            }}
          />
        ))
      )}
    </div>
  );
}

export default TodoList;
