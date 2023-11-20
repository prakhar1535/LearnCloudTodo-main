
import React, { useEffect, useState } from "react";
import TodoList from "./components/TodoList/TodoList";
import AddTodoForm from "./components/AddTodoForm/AddTodoForm";
import {
  fetchTodos,
  addTodo,
  updateTodoPosition,
  deleteTodo,
  updateTodoChecked,
} from "./services/api";
import { DragDropContext } from "react-beautiful-dnd";
import './App.css'

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInitialTodos = async () => {
      setLoading(true);
      const initialTodos = await fetchTodos();
      setTodos(initialTodos);
      setLoading(false);
    };
    fetchInitialTodos();
  }, []);

  const handleToggle = async (todo) => {
    setLoading(true);
    await updateTodoChecked(todo);
    const updatedTodos = await fetchTodos();
    setTodos(updatedTodos);
    setLoading(false);
  };

  const handleAddTodo = async (title, description) => {
    setLoading(true);
    const newTodo = await addTodo(title, description);
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setLoading(false);
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    setLoading(true);
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex !== destinationIndex) {
      const reorderedTodos = Array.from(todos);
      const [removed] = reorderedTodos.splice(sourceIndex, 1);
      reorderedTodos.splice(destinationIndex, 0, removed);
      await updateTodoPosition(result.draggableId, destinationIndex);
      setTodos(reorderedTodos);
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo._id !== id));
    setLoading(false);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="container mx-auto mt-8 p-4 bg-gray-900 text-white min-h-screen">
        <h1 className="text-3xl font-semibold mb-4">Todo App</h1>
        <AddTodoForm onAdd={handleAddTodo} loading={loading} />
        <TodoList
          todos={todos}
          handleToggle={handleToggle}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
