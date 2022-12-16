import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filterdTodos, setFilterdTodos] = useState([]);

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilterdTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilterdTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilterdTodos(todos);
        break;
    }
  };

  const onChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const submitTodosHandler = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      { todo: input, id: Math.random() * 1000, completed: false },
    ]);
    setInput("");
  };

  const deleteHandler = (todo) => {
    let filterTodo = todos.filter((elem) => elem.id !== todo.id);
    setTodos(filterTodo);
  };

  const completeHandler = (todo) => {
    let completeTodo = todos.map((elem) => {
      if (elem.id === todo.id) {
        return {
          ...elem,
          completed: !elem.completed,
        };
      }
      return elem;
    });
    setTodos(completeTodo);
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  const todosList = filterdTodos.map((todo) => {
    return (
      <div key={todo.id} className="todo">
        <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
          {todo.todo}
        </li>
        <button onClick={() => completeHandler(todo)} className="complete-btn">
          <i className="fas fa-check"></i>
        </button>
        <button onClick={() => deleteHandler(todo)} className="trash-btn">
          <i className="fas fa-trash"></i>
        </button>
      </div>
    );
  });

  //Save to local
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
    <div>
      <header>
        <h1>Todo's List</h1>
      </header>
      <form>
        <input
          type="text"
          value={input}
          onChange={onChangeHandler}
          className="todo-input"
        />
        <button
          onClick={submitTodosHandler}
          className="todo-button"
          type="submit"
        >
          <i className="fas fa-plus-square"></i>
        </button>
        <div className="select">
          <select onChange={statusHandler} name="todos" className="filter-todo">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
      </form>
      <div className="todo-container">
        <ul className="todo-list">{todosList}</ul>
      </div>
    </div>
  );
};

export default App;
