"use client";
import { todo } from "@/app/utils/interface";
import React, { useState } from "react";
import TodoItem from "./todoItem";
import constants from "@/app/utils/constants";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

interface todoListDto {
  heading?: string | undefined;
  onHeaderClick?: () => void;
  isModeExpanded?: any;
  headerHasExtraFunctionality?: boolean;
  todos: todo[];
  updateTodoList: (updatedTodo: todo) => void;
  deleteFromTodoList: (id: string) => void;
}
const TodoList = ({
  heading,
  onHeaderClick,
  isModeExpanded,
  headerHasExtraFunctionality,
  todos,
  updateTodoList,
  deleteFromTodoList,
}: todoListDto) => {
  const updateTodo = (todoToUpdate: todo) => {
    updateTodoList(todoToUpdate);
  };
  return (
    <div className="w-full h-full flex flex-col justify-center rounded-lg bg-white text-black">
      {heading ? (
        <div
          className="flex w-full justify-between items-center px-4"
          style={{ alignSelf: headerHasExtraFunctionality ? "" : "center" }}
          onClick={onHeaderClick}
        >
          <span className="rounded-full mr-4 bg-slate-200 border px-[0.8rem] py-1">
            {todos.length}
          </span>
          <h1
            className="w-full text-xl py-1"
            style={{
              textAlign: headerHasExtraFunctionality ? "start" : "center",
            }}
          >
            {heading}
            {/* <span className="rounded-full ml-4 bg-slate-200 border px-[0.8rem] py-1">
              {todos.length}
            </span> */}
          </h1>
          {headerHasExtraFunctionality && isModeExpanded}
        </div>
      ) : null}
      <div
        style={{
          scrollbarWidth: "thin",
          borderTop: heading ? "1px solid" : "",
          paddingTop: heading ? "1rem" : "",
        }}
        className="flex thinScroll my-2 px-2 py-2 flex-col space-y-2 w-full h-full max-md:border-b border-black items-center overflow-y-auto overflow-x-hidden"
      >
        {todos.map((todo: todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              updateTodo={updateTodo}
              deleteFromTodoList={deleteFromTodoList}
              heading={heading}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
