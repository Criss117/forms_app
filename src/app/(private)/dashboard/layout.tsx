"use client";
import { PropsWithChildren, useEffect } from "react";

import { useFolderStore, useRecentStore } from "@/zustand";
import { useApiPetition, useFolderActions } from "@/hooks";
import { TooltipProvider } from "@/components/ui";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const { ready } = useApiPetition();

  const { findAllFolders } = useFolderActions();
  const { clearFolders, setFolders } = useFolderStore();
  const { loadOnLS } = useRecentStore();

  useEffect(() => {
    if (!ready) return;

    findAllFolders().then((folders) => setFolders(folders));
    loadOnLS();

    return () => {
      clearFolders();
    };
  }, [ready]);

  return <TooltipProvider delayDuration={200}>{children}</TooltipProvider>;
};

export default DashboardLayout;
