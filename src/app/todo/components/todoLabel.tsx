import { todo } from "@/app/utils/interface";
import React from "react";
import { AiOutlineMinusSquare } from "react-icons/ai";
import { BsSquare, BsCheckSquare } from "react-icons/bs";
import { todoStates } from "@/app/utils/todoHelper";
import { AiOutlineApartment } from "react-icons/ai";
interface TodoLabelProps {
  todo: todo;
  changeTodoStatus: () => void;
}

const TodoLabel = ({ todo, changeTodoStatus }: TodoLabelProps) => {
  return (
    <div className="flex items-center space-x-2 text-xl pl-3">
      <div onClick={changeTodoStatus} className="h-6 w-6 flex items-center">
        {todo.status == todoStates.pending && <BsSquare />}
        {todo.status == todoStates.inProgress && (
          <AiOutlineMinusSquare color="#d97706" />
        )}
        {todo.status == todoStates.complete && <BsCheckSquare />}
      </div>
      <p className="text-gray-600  flex items-center space-x-1">
        <span className="text-sm">{todo.subTodos.length}</span>
        <AiOutlineApartment color="#4b5563" size={15} />
      </p>
      <p
        style={{
          textDecoration:
            todo.status == todoStates.complete ? "line-through" : "",
        }}
      >
        {todo.text}
      </p>
    </div>
  );
};

export default TodoLabel;
