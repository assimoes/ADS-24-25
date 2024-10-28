import { useEffect, useState } from 'react';
import { fetchTodos, saveTodo, deleteTodoAPI, toggleCompleteAPI } from '../api';

export const useTodos = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const loadTodos = async () => {
      const fetchedTodos = await fetchTodos()
      console.log('Fetched Todos:', fetchedTodos);
      setTodos(fetchedTodos)
    }

    loadTodos()
  }, [])

  const addTodo = async (title) => {
    const newTodo = await saveTodo(title)
    console.log(newTodo)
    setTodos((prevTodos) => [...prevTodos, newTodo])
  }

  const deleteTodo = async (id) => {
    await deleteTodoAPI(id)
    setTodos((prevTodos) => prevTodos.filter((todo)=> todo.id !== id))
  }

  const toggleComplete = async (id) => {
    const updatedTodo = await toggleCompleteAPI(id)
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)))
  }

  return {todos, addTodo, deleteTodo, toggleComplete}
}