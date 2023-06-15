//@ts-nocheck
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { signToken, verifyToken } from "@/app/utils/authHelper";
import { user } from "./constants";
import db from "@/app/db.json";
import Cookies from "universal-cookie";

const UserContext = createContext({});

export const UserProvider = ({ children }: any) => {
  const initialUser: user = {
    id: null,
    name: "",
  };
  const [user, setUser] = useState(initialUser);
  const [isLogin, setIsLogin] = useState(false);

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

  const CheckToken = async () => {
    try {
      const token = cookies.get("token");
      if (!token) {
        return false;
      }
      const { payload } = await verifyToken(token);
      console.log(payload);
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
    const check = async () => {
      await CheckToken();
    };
    check();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLogin, Login, Logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const { user, isLogin, Login, Logout } = useContext(UserContext);
  return { user, isLogin, Login, Logout };
};
