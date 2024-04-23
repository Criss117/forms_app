"use client";
import { PropsWithChildren, useEffect } from "react";
import { useSession } from "next-auth/react";

import { useFolderStore } from "@/zustand";
import { useFolderActions } from "@/hooks";
import { TooltipProvider } from "@/components/ui";

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

  return <TooltipProvider delayDuration={200}>{children}</TooltipProvider>;
};

export default DashboardLayout;
