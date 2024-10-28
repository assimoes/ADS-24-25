// src/context/TodosContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchTodos, saveTodo, deleteTodoAPI, toggleCompleteAPI } from '../api';

const TodosContext = createContext();

export const useTodosContext = () => useContext(TodosContext);

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const loadTodos = async () => {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
    };
    loadTodos();
  }, []);

  const addTodo = async (title) => {
    const newTodo = await saveTodo(title);
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const deleteTodo = async (id) => {
    await deleteTodoAPI(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = async (id) => {
    const updatedTodo = await toggleCompleteAPI(id);
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  return (
    <TodosContext.Provider value={{ todos, addTodo, deleteTodo, toggleComplete }}>
      {children}
    </TodosContext.Provider>
  );
};
