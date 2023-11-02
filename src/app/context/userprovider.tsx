//@ts-nocheck
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { signToken, verifyToken } from "@/app/utils/authHelper";
import { user } from "./constants";
import dbl from "@/app/db.json";
import Cookies from "universal-cookie";
const UserContext = createContext({});

export const UserProvider = ({ children }: any) => {
  const initialUser: user = {
    id: null,
    name: "",
  };
  const [user, setUser] = useState(initialUser);
  const [isLogin, setIsLogin] = useState(false);
  const [db, setDB] = useState(dbl)
  const cookies = new Cookies();
  const cookieConfig = {
    path: "/",
    maxAge: 60 * 60 * 24,
    secure: true,
  };

  const Login = async (email: string, password: string) => {
    try {
      const currentUser = db.find((user: user) => {
        if (user.email === email) {
          if (user.password === password) return user;
        }
      });
      if (!currentUser) {
        return { success: false, message: "User Not Found" };
      }
      const payload = { email: currentUser.email, id: currentUser.id };

      const token = await signToken(payload);
      console.log(token);
      cookies.set("token", token, cookieConfig);

      setUser({
        name: currentUser.name,
        id: currentUser.id,
      });
      setIsLogin(true);
      return { success: true, message: "Login Success" };
    } catch (err) {
      console.log(err);
      return { err, message: "Login Failed" };
    }
  };
  const signup = (name, email, password) => {
    const newUser = {
      name, email, password, id: Math.floor(Math.random() * 90000) + 10000, todos: []
    }
    localStorage.setItem("users", JSON.stringify([...db, newUser]))
    setDB([...db, newUser]);
    setUser(newUser);
    return { success: true, message: "Welcome to Todo !" };
  }
  const CheckToken = async () => {
    try {
      const token = cookies.get("token");
      if (!token) {
        return false;
      }
      const { payload } = await verifyToken(token);
      setIsLogin(true);
      setUser(db.find((user: user) => user.id === payload.id));
      return payload;
    } catch (err) {
      console.log(err);
      cookies.remove("token");
      setIsLogin(false);
      setUser(initialUser);
      return false;
    }
  };
  const Logout = () => {
    setUser(initialUser);
    cookies.remove("token");
    setIsLogin(false);
  };

  useEffect(() => {
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify(db));
    } else {
      const dbs = JSON.parse(localStorage.getItem("users"))
      setDB(dbs)
    }
    const check = async () => {
      console.log(db)
      await CheckToken();
    };
    check();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLogin, Login, Logout, signup }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const { user, isLogin, Login, Logout, signup } = useContext(UserContext);
  return { user, isLogin, Login, Logout, signup };
};
