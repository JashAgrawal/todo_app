import { nanoid } from "nanoid";

export enum todoStates {
  pending = 0,
  inProgress = 1,
  complete = 2,
}

export const getNewTodo = () => {
  return {
    text: "",
    id: nanoid(),
    subTodos: [],
    status: todoStates.pending,
  };
};
