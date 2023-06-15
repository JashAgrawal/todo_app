import Image from "next/image";
import logo from "@/app/assets/logo.png";
import { todo } from "./interface";
import { nanoid } from "nanoid";
interface iconstants {
  logo: (arg0?: string) => any;
  todos: todo[];
}
const constants: iconstants = {
  logo: (className?: string) => (
    <Image src={logo} alt="Logo" className={className || "w-16 h-16"} />
  ),
  todos: [
    {
      text: "hi",
      id: nanoid(),
      subTodos: [{ text: "hiiii", id: nanoid(), subTodos: [], status: 0 }],
      status: 0,
    },
    { text: "hiiii", id: nanoid(), subTodos: [], status: 0 },
    {
      text: "hi",
      id: nanoid(),
      subTodos: [{ text: "hiiii", id: nanoid(), subTodos: [], status: 0 }],
      status: 0,
    },
    { text: "hiiii", id: nanoid(), subTodos: [], status: 0 },
    {
      text: "hi",
      id: nanoid(),
      subTodos: [{ text: "hiiii", id: nanoid(), subTodos: [], status: 0 }],
      status: 0,
    },
    { text: "hiiii", id: nanoid(), subTodos: [], status: 0 },
    {
      text: "hi",
      id: nanoid(),
      subTodos: [{ text: "hiiii", id: nanoid(), subTodos: [], status: 0 }],
      status: 0,
    },
    { text: "hiiii", id: nanoid(), subTodos: [], status: 0 },
    {
      text: "hi",
      id: nanoid(),
      subTodos: [{ text: "hiiii", id: nanoid(), subTodos: [], status: 0 }],
      status: 0,
    },
    { text: "hiiii", id: nanoid(), subTodos: [], status: 0 },
    {
      text: "hi",
      id: nanoid(),
      subTodos: [{ text: "hiiii", id: nanoid(), subTodos: [], status: 0 }],
      status: 0,
    },
    { text: "hiiii", id: nanoid(), subTodos: [], status: 0 },
  ],
};

export const validateInput = (email: string, password: string) => {
  if (
    !String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    return { success: false, message: "Enter valid email" };
  }
  if (
    !String(password)
      .toLowerCase()
      .match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  ) {
    return {
      success: false,
      message: `Password Must be \n - Minimum 8 length  \n - One letter \n - One number \n - One Special Character`,
    };
  }
  return { success: true, message: "" };
};
export default constants;

export const NavigationOptions = [
  {
    title: "Todos Dashboard",
    route: "/todo",
  },
];

export const nonNavbarRoutes = ["/auth/login"];
