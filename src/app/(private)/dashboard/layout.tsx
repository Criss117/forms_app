"use client";
import { PropsWithChildren, useEffect } from "react";

import { useFolderStore } from "@/zustand";
import { useApiPetition, useFolderActions } from "@/hooks";
import { TooltipProvider } from "@/components/ui";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const { ready } = useApiPetition();

  const { findAllFolders } = useFolderActions();
  const { clearFolders, setFolders } = useFolderStore();

  useEffect(() => {
    if (!ready) return;

    findAllFolders().then((folders) => setFolders(folders));

    return () => {
      clearFolders();
    };
  }, [ready]);

  return <TooltipProvider delayDuration={200}>{children}</TooltipProvider>;
};

export default DashboardLayout;
