import { todo } from "@/app/utils/interface";
import { getNewTodo } from "@/app/utils/todoHelper";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { MdFormatListBulletedAdd } from "react-icons/md";

interface AddTodoProps {
  newTodo: todo;
  setNewTodo: any;
  onAddTodo: () => void;
}
const getSantizedInput = (data: any, setter: (value: any) => any) => {
  const regex = /^[A-Za-z0-9._@-]+$/;
  console.log(regex.test(data.text));
  if (regex.test(data.text) || data.text == "") {
    setter(data);
    return;
  }
  toast.error("Only letters , digits and @ . _ -  are allowed", {
    id: "input error",
  });
  return;
};

const AddTodo = ({ newTodo, setNewTodo, onAddTodo }: AddTodoProps) => {
  const [error, setError] = useState(false);

  return (
    <form
      className="flex w-full justify-between items-center text-black"
      onSubmit={(e) => {
        e.preventDefault();
        if (newTodo.text === "") {
          setError(true);
          return;
        }
        onAddTodo();
        setNewTodo(getNewTodo());
      }}
    >
      <input
        type="text"
        maxLength={30}
        placeholder={error ? "This Feild Cannot be Empty" : "Add Task"}
        value={newTodo.text}
        onChange={(e) => {
          setError(false);
          getSantizedInput({ ...newTodo, text: e.target.value }, setNewTodo);
        }}
        className="border-b rounded-md bg-slate-200 text-black placeholder-slate-600 font-pbg border-slate-400 text-xl w-full px-[1.5%] py-[1%]"
        style={{ borderBottom: error ? "2px solid red" : "" }}
      />
      <button type="submit" className="ml-4" disabled={error}>
        <MdFormatListBulletedAdd
          size={36}
          color="black"
          className="rounded-full border border-black p-1 bg-indigo-300	"
        />
      </button>
    </form>
  );
};

export default AddTodo;
