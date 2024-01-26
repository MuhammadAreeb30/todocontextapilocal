import { createContext, useContext } from "react";

const TodoContext = createContext({
  todos: [
    {
      id: 2,
      todo: "todo msg",
      completed: false,
    },
  ],
  addTodo: (todo) => {},
  updateTodo: (todo, id) => {},
  deleteTodo: (id) => {},
  toggleCompleted: (id) => {},
});

const TodoProvider = TodoContext.Provider;

const useTodo = () => {
  return useContext(TodoContext);
};

export { TodoProvider, useTodo };
