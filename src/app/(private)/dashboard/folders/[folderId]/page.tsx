"use client";
import { useEffect } from "react";

import { useFolderActions } from "@/hooks";
import { useFolderStore } from "@/zustand";
import {
  FolderBody,
  FolderHeader,
  FolderHeaderSkeleton,
  Members,
} from "./_components";
import { useSession } from "next-auth/react";

interface Props {
  params: {
    folderId: string;
  };
}

const FolderPage = ({ params }: Props) => {
  const { data } = useSession();
  const { isPending, findOneFolder } = useFolderActions();
  const { clearCurrentFolder } = useFolderStore();

  const { folderId } = params;

  useEffect(() => {
    findOneFolder(folderId);

    return () => {
      clearCurrentFolder();
    };
  }, [folderId, data]);

  return (
    <>
      <FolderHeader isPending={isPending} />
      <Members />
      <FolderBody isPending={isPending} />
    </>
  );
};

export default FolderPage;
