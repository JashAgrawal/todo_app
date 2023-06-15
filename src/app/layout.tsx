"use client";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { UserProvider } from "./context/userprovider";
import { TodoProvider } from "./context/todoprovider";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Navbar from "./components/Navbar";
import { nonNavbarRoutes } from "./utils/constants";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [render, setRender] = useState(false);
  const pathName = usePathname();
  useEffect(() => {
    if (typeof window !== "undefined") {
      // this makes sure the window is mounted before rendering since localstorage requires window for operation
      setRender(true);
    }
  }, []);
  return (
    <html lang="en">
      <body className="md:overflow-y-hidden overflow-x-hidden">
        {render && (
          <UserProvider>
            <TodoProvider>
              <Toaster position="top-right" />
              {!nonNavbarRoutes.includes(pathName) && <Navbar />}
              <ProtectedRoutes>{children}</ProtectedRoutes>
            </TodoProvider>
          </UserProvider>
        )}
      </body>
    </html>
  );
}
