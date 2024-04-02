"use client";
import { PropsWithChildren, useEffect } from "react";
import { useSession } from "next-auth/react";

import { useFolderStore } from "@/zustand";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const { data } = useSession();
  const { clearFolders, getFolders } = useFolderStore();

  useEffect(() => {
    getFolders(data?.user?.jwt);
    return () => {
      clearFolders();
    };
  }, [data]);

  return <>{children}</>;
};

export default DashboardLayout;
