import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

import { TodosProvider } from './context/TodosContext';

const App = () => 
   (
    <TodosProvider>
      <div>
        <h1>Todo App</h1>
        <TodoForm />
        <TodoList />
      </div>
    </TodosProvider>
  );


export default App;
