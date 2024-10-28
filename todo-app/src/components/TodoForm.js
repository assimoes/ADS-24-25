import React, {useState} from 'react';

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      addTodo(title)
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