import React, { useEffect } from "react";
import { useUser } from "../context/userprovider";
import { usePathname, useRouter } from "next/navigation";

interface ProtectedRoutesProps {
  children: React.ReactNode;
}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const router = useRouter();
  const protectedRoutes = ["/todo"];
  const { user, isLogin } = useUser();
  const pathname = usePathname();

  useEffect(() => {
    if (user.id !== "") {
      if (!isLogin) {
        if (protectedRoutes.includes(pathname)) {
          router.replace("/auth/login");
        }
      } else {
        router.replace("/todo");
      }
    }
  }, [pathname, user, isLogin]);

  return <>{children}</>;
};

export default ProtectedRoutes;
