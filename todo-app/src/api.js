let mockTodos = [
  { id: 1, title: 'Learn React', completed: false },
  { id: 2, title: 'Build a Todo App', completed: true },
];

export const fetchTodos = () =>
  new Promise((resolve) => setTimeout(() => resolve(mockTodos), 500));

export const saveTodo = (title) =>
  new Promise((resolve) => {
    const newTodo = { id: Date.now(), title, completed: false };
    mockTodos = [...mockTodos, newTodo]
    setTimeout(() => resolve(newTodo), 500);
  });

export const deleteTodoAPI = (id) =>
  new Promise((resolve) => setTimeout(() => resolve(), 500));

export const toggleCompleteAPI = (id) =>
  new Promise((resolve) => {
    mockTodos = mockTodos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    const updatedTodo = mockTodos.find((todo) => todo.id === id);
    
    setTimeout(() => resolve(updatedTodo), 500);
  });