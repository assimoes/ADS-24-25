import React, { useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

import { useDispatch } from 'react-redux';
import { loadTodos } from './features/todosSlice';

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(loadTodos())

  }, [dispatch])

  return (
     <div>
       <h1>Todo App</h1>
       <TodoForm />
       <TodoList />
     </div>
 );
}


export default App;
