import { todoStates } from "./todoHelper";

export interface todo {
  text: string;
  id: string;
  subTodos: todo[];
  status: todoStates;
}

export interface user {
  id: number;
  name: string;
  email?: string;
  password?: string;
  todos?: todo[];
}
