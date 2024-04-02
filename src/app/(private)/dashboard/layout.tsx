"use client";
import { PropsWithChildren, useEffect } from "react";
import { useSession } from "next-auth/react";

import { useFolderStore } from "@/zustand";
import { useFolderActions } from "@/hooks";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const { data } = useSession();
  const { clearFolders } = useFolderStore();
  const { findAllFolders } = useFolderActions();

  useEffect(() => {
    findAllFolders();
    return () => {
      clearFolders();
    };
  }, [data]);

  return <>{children}</>;
};

export default DashboardLayout;
