import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTodos, saveTodo, deleteTodoAPI, toggleCompleteAPI } from '../api';

export const loadTodos = createAsyncThunk('todos/loadTodos', async () => {
  const response = await fetchTodos()
  return response
})

export const addNewTodo = createAsyncThunk('todos/addNewTodo', async (title) => {
  const response = await saveTodo(title)
  return response
})

export const deleteExistingTodo = createAsyncThunk('todos/deleteExistingTodo', async(id) => {
  await deleteTodoAPI(id)
  return id
})

export const toggleTodoComplete = createAsyncThunk(
  'todos/toggleTodoComplete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await toggleCompleteAPI(id);
      return response;
    } catch (error) {
      console.error("Error in toggleTodoComplete:", error); // Log any errors
      return rejectWithValue(error.message);
    }
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    list: [],
    status: 'idle'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTodos.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loadTodos.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.list.push(action.payload)
      })
      .addCase(deleteExistingTodo.fulfilled, (state, action) => {
        state.list = state.list.filter((todo) => todo.id !== action.payload);
      })
      .addCase(toggleTodoComplete.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        const index = state.list.findIndex((todo) => todo.id === updatedTodo.id);
        if (index !== -1) {
          state.list[index] = updatedTodo;
        }
      });

  }
})

export default todosSlice.reducer