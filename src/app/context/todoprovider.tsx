//@ts-nocheck
import React, { createContext, useContext, useEffect, useState } from "react";
import db from "@/app/db.json";
import Cookies from "universal-cookie";
import { todo } from "../utils/interface";
import { verifyToken } from "../utils/authHelper";

const TodoContext = createContext({});

export const TodoProvider = ({ children }: any) => {
  // const [todos, setTodos] = useState(initialTodos);
  const [currentUserId, setCurrentUserId] = useState("");
  const cookies = new Cookies();

  const getTodosFromLS = (): { id: todo[] } => {
    return JSON.parse(localStorage.getItem("todos"));
  };
  const updateCurrentUserTodos = (todoList: todo[]) => {
    const todos = getTodosFromLS();
    todos[currentUserId] = todoList;
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const getCurrentUserTodos = () => {
    return getTodosFromLS()[currentUserId] || [];
  };

  const setCurrentUserTodos = async () => {
    try {
      const token = cookies.get("token");
      if (!token) {
        return false;
      }
      const { payload } = await verifyToken(token);
      setCurrentUserId(payload?.id || "");
      return payload;
    } catch (err) {
      console.log(err);
      cookies.set("token", "");
      setCurrentUserId("");
      return false;
    }
  };
  const getInitialObj = () => {
    const obj = {};
    db.map((user) => {
      obj[user.id] = user.todos;
    });
    return obj;
  };
  useEffect(() => {
    if (!localStorage.getItem("todos")) {
      localStorage.setItem("todos", JSON.stringify(getInitialObj()));
    }
    setCurrentUserTodos();
    // getCurrentUserTodos();
  }, []);
  return (
    <TodoContext.Provider
      value={{ getCurrentUserTodos, updateCurrentUserTodos, currentUserId }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const { getCurrentUserTodos, updateCurrentUserTodos, currentUserId } =
    useContext(TodoContext);
  return { getCurrentUserTodos, updateCurrentUserTodos, currentUserId };
};
