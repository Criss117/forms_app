"use client";
import { useEffect } from "react";

import { useApiPetition, useFolderActions } from "@/hooks";
import { useFolderStore, useRecentStore } from "@/zustand";
import { FolderBody, FolderHeader, Members } from "./_components";

interface Props {
  params: {
    folderId: string;
  };
}

const FolderPage = ({ params }: Props) => {
  const { ready } = useApiPetition();
  const { isPending, findOneFolder } = useFolderActions();
  const { addRecent } = useRecentStore();
  const { clearCurrentFolder, setCurrentFolder } = useFolderStore();

  const { folderId } = params;

  useEffect(() => {
    if (!ready) return;

    findOneFolder(folderId).then((folder) => {
      setCurrentFolder(folder);
      addRecent({
        url: `/dashboard/folders/${folderId}`,
        type: "folder",
        name: folder?.name || "FOlderName",
      });
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
