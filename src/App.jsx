import React, { useEffect, useState } from "react";
import { TodoProvider } from "./context/todocontext";
import TodoItem from "./components/TodoItem";
import TodoForm from "./components/TodoForm";

const App = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [...prev, { ...todo }]);
  };

  const updateTodo = (todo, id) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (todo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };

  const toggleCompleted = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  const removeAll = () => {
    setTodos([]);
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, updateTodo, addTodo, deleteTodo, toggleCompleted }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div className="w-full" key={todo.id}>
                <TodoItem todo={todo} />
              </div>
            ))}
            {todos.length === 0 ? (
              <></>
            ) : (
              <button
                className="p-3 bg-red-600 rounded-md capitalize"
                onClick={removeAll}
              >
                remove all
              </button>
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
};

export default App;
