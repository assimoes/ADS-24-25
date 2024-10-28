import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useTodos } from './hooks/useTodos';

const App = () => {
  const { todos, addTodo, deleteTodo, toggleComplete } = useTodos();

  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
    </div>
  );
};

export default App;
