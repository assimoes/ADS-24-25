import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewTodo } from '../features/todosSlice';

function TodoForm() {
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      dispatch(addNewTodo(title))
      setTitle('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Create a new TODO'>
        </input>
        <button type='submit'>Add</button>
    </form>
  )
}


export default TodoForm