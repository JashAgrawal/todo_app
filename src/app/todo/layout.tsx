import React from "react";

const TodoLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-[90vh] flex justify-center bg-indigo-300 items-center">
      {children}
    </div>
  );
};

export default TodoLayout;
