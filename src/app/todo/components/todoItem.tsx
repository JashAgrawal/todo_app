import React, { useState } from "react";
import {
  BiChevronUp as BsChevronCompactUp,
  BiChevronDown as BsChevronCompactDown,
} from "react-icons/bi";
import AddTodo from "./addtodo";
import TodoLabel from "./todoLabel";
import { todo } from "@/app/utils/interface";
import { getNewTodo, todoStates } from "@/app/utils/todoHelper";
import TodoList from "./todoList";
import { RiDeleteBin5Fill } from "react-icons/ri";
interface TodoItemProps {
  todo: todo;
  updateTodo: (arg0: todo) => void;
  deleteFromTodoList: (id: string) => void;
  heading: string | undefined;
}

const TodoItem = ({
  todo,
  updateTodo,
  deleteFromTodoList,
  heading,
}: TodoItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [subTasks, setSubTasks] = useState(todo.subTodos);
  const [newTodo, setNewTodo] = useState<todo>(getNewTodo());

  const onAddSubTodo = () => {
    setSubTasks([...subTasks, newTodo]);
    updateTodo({ ...todo, subTodos: [...subTasks, newTodo] });
  };

  const changeTodoStatus = () => {
    updateTodo({ ...todo, status: (todo.status + 1) % 3 });
  };

  //   const onSubItemChange = (subIndex: number) => {
  //     const temp = [...subTasks];
  //     temp[subIndex].isCompleted = !temp[subIndex].isCompleted;
  //     updateTodo({ ...todo, subTasks: temp });
  //   };
  const updateTodoListSubTask = (updatedTodo: todo) => {
    const tempTodo = [...subTasks];
    const todoIndex = tempTodo.findIndex((todo) => todo.id === updatedTodo.id);
    if (todoIndex == -1) {
      alert("todo not found in list");
      return;
    }
    tempTodo[todoIndex] = updatedTodo;
    setSubTasks([...tempTodo]);
    updateTodo({ ...todo, subTodos: subTasks });
  };

  const deleteTodoListSubTask = (id: string) => {
    const tempTodo = [...subTasks];
    const todoIndex = tempTodo.findIndex((todo) => todo.id === id);
    if (todoIndex == -1) {
      alert("todo not found in list");
      return;
    }
    tempTodo.splice(todoIndex, 1);
    setSubTasks(tempTodo);
    updateTodo({ ...todo, subTodos: tempTodo });
  };

  return (
    <div className="flex flex-col border shadow-md shadow-indigo-500/40 w-full items-center justify-between rounded-md">
      <div
        className={`flex py-2 w-full justify-between ${
          isExpanded && "border-b border-gray-700 pb-2 "
        }`}
      >
        <TodoLabel todo={todo} changeTodoStatus={changeTodoStatus} />
        <div className="flex justify-center items-center pr-2 space-x-2">
          {isExpanded ? (
            <BsChevronCompactUp
              onClick={() => {
                setIsExpanded(!isExpanded);
              }}
              size={30}
            />
          ) : (
            <BsChevronCompactDown
              onClick={() => {
                setIsExpanded(!isExpanded);
              }}
              size={30}
            />
          )}

          <RiDeleteBin5Fill
            onClick={() => {
              deleteFromTodoList(todo.id);
            }}
          />
        </div>
      </div>
      {/* nested todos */}
      {isExpanded && (
        <div className="pl-8 mr-4 flex flex-col py-2 w-full space-y-2 overflow-x-hidden">
          {!!subTasks.length ? (
            <TodoList
              todos={subTasks}
              updateTodoList={updateTodoListSubTask}
              deleteFromTodoList={deleteTodoListSubTask}
            />
          ) : (
            "No Sub Tasks"
          )}
          {todo.status === todoStates.pending && heading && (
            <AddTodo
              newTodo={newTodo}
              setNewTodo={setNewTodo}
              onAddTodo={onAddSubTodo}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TodoItem;
