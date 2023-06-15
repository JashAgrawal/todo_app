"use client";
import React, { useEffect, useState } from "react";
import TodoList from "./components/todoList";
import constants from "../utils/constants";
import AddTodo from "./components/addtodo";
import { getNewTodo, todoStates } from "../utils/todoHelper";
import { todo } from "../utils/interface";
import { useTodo } from "../context/todoprovider";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

const Todo = () => {
  const { getCurrentUserTodos, updateCurrentUserTodos, currentUserId } =
    useTodo();
  const [isCompletedExpanded, setIsCompletedExpanded] = useState(false);
  const [isProgressExpanded, setIsProgressExpanded] = useState(true);
  const [todosList, setTodosList] = useState(getCurrentUserTodos());
  const [newTodo, setNewTodo] = useState<todo>(getNewTodo());
  const saveTodoList = (todoList: todo[]) => {
    setTodosList(todoList);
    updateCurrentUserTodos(todoList);
  };
  const AddToTodoList = () => {
    saveTodoList([...todosList, newTodo]);
  };
  const deleteFromTodoList = (id: string) => {
    const tempTodo = [...todosList];
    const todoIndex = tempTodo.findIndex((todo) => todo.id === id);
    if (todoIndex == -1) {
      alert("todo not found in list");
      return;
    }
    tempTodo.splice(todoIndex, 1);
    saveTodoList(tempTodo);
  };
  const updateTodoList = (updatedTodo: todo) => {
    const tempTodo = [...todosList];
    const todoIndex = tempTodo.findIndex((todo) => todo.id === updatedTodo.id);
    if (todoIndex == -1) {
      alert("todo not found in list");
      return;
    }
    tempTodo[todoIndex] = updatedTodo;
    saveTodoList([...tempTodo]);
  };

  const toggleProgressTasks = () => {
    setIsProgressExpanded(!isProgressExpanded);
    setIsCompletedExpanded(!isCompletedExpanded);
  };

  const toggleCompletedTasks = () => {
    setIsCompletedExpanded(!isCompletedExpanded);
    setIsProgressExpanded(!isProgressExpanded);
  };

  useEffect(() => {
    setTodosList(getCurrentUserTodos());
  }, [currentUserId]);

  return (
    <div className="flex max-md:flex-col max-md:space-y-4 w-full h-[80%] rounded-2xl py-2 px-8 md:space-x-8">
      <div className="flex flex-col w-full h-full p-6 pb-2 rounded-2xl bg-white shadow-lg shadow-indigo-500/40 text-black border justify-center items-center">
        <AddTodo
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          onAddTodo={AddToTodoList}
        />
        <div
          style={{ scrollbarWidth: "thin" }}
          className="overflow-hidden w-full flex h-full p-2 space-x-3 rounded-lg"
        >
          <TodoList
            heading="Pending Todos"
            todos={todosList.filter(
              (todo: todo) => todo.status == todoStates.pending
            )}
            updateTodoList={updateTodoList}
            deleteFromTodoList={deleteFromTodoList}
          />
          {/* <TodoList
            heading="In Progress Todos"
            todos={todosList.filter(
              (todo: todo) => todo.status == todoStates.inProgress
            )}
            updateTodoList={updateTodoList}
            deleteFromTodoList={deleteFromTodoList}
          />
          <TodoList
            heading="Completed Todos"
            todos={todosList.filter(
              (todo: todo) => todo.status == todoStates.complete
            )}
            updateTodoList={updateTodoList}
            deleteFromTodoList={deleteFromTodoList}
          /> */}
        </div>
      </div>
      <div className="flex flex-col w-full justify-between space-y-4">
        <div
          style={{
            scrollbarWidth: "thin",
            height: isProgressExpanded ? "100%" : "",
          }}
          className="flex overflow-hidden md:p-2 w-full rounded-2xl bg-white shadow-lg shadow-indigo-500/40 text-black border justify-center items-center"
        >
          {isProgressExpanded ? (
            <TodoList
              heading="In Progress Todos"
              onHeaderClick={toggleProgressTasks}
              isModeExpanded={
                isProgressExpanded ? <BsChevronUp /> : <BsChevronDown />
              }
              headerHasExtraFunctionality
              todos={todosList.filter(
                (todo: todo) => todo.status == todoStates.inProgress
              )}
              updateTodoList={updateTodoList}
              deleteFromTodoList={deleteFromTodoList}
            />
          ) : (
            <div
              className="flex w-full justify-between items-center px-4"
              onClick={toggleProgressTasks}
            >
              <h1 className="text-xl py-1">In Progress Todos</h1>
              {isProgressExpanded ? <BsChevronUp /> : <BsChevronDown />}
            </div>
          )}
        </div>
        <div
          style={{
            scrollbarWidth: "thin",
            height: isCompletedExpanded ? "100%" : "",
          }}
          className="flex overflow-hidden p-2 w-full rounded-2xl bg-white shadow-lg shadow-indigo-500/40 text-black border justify-center items-center"
        >
          {isCompletedExpanded ? (
            <TodoList
              heading="Completed Todos"
              onHeaderClick={toggleCompletedTasks}
              isModeExpanded={
                isCompletedExpanded ? <BsChevronUp /> : <BsChevronDown />
              }
              headerHasExtraFunctionality
              todos={todosList.filter(
                (todo: todo) => todo.status == todoStates.complete
              )}
              updateTodoList={updateTodoList}
              deleteFromTodoList={deleteFromTodoList}
            />
          ) : (
            <div
              className="flex w-full justify-between items-center px-4"
              onClick={toggleCompletedTasks}
            >
              <h1 className="text-xl py-1">Completed Todos</h1>
              {isCompletedExpanded ? <BsChevronUp /> : <BsChevronDown />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
