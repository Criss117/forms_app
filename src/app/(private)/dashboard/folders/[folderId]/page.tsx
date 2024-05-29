"use client";
import { useEffect } from "react";

import { useApiPetition, useFolderActions } from "@/hooks";
import { useFolderStore } from "@/zustand";
import { FolderBody, FolderHeader, Members } from "./_components";

interface Props {
  params: {
    folderId: string;
  };
}

const FolderPage = ({ params }: Props) => {
  const { ready } = useApiPetition();
  const { isPending, findOneFolder } = useFolderActions();
  const { clearCurrentFolder, setCurrentFolder } = useFolderStore();

  const { folderId } = params;

  useEffect(() => {
    if (!ready) return;

    findOneFolder(folderId).then((folder) => {
      setCurrentFolder(folder);
    });

    return () => {
      clearCurrentFolder();
    };
  }, [folderId, ready]);

  return (
    <>
      <FolderHeader isPending={isPending} />
      <Members />
      <FolderBody isPending={isPending} />
    </>
  );
};

export default FolderPage;
