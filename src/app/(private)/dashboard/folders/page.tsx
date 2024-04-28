"use client";

import { useFolderStore } from "@/zustand";
import {
  CreateFolderPopover,
  FolderCard,
  FolderCardSkeleton,
} from "./_components";

const FoldersPage = () => {
  const { folders } = useFolderStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 mt-5">
      {folders.length === 0 && (
        <>
          <FolderCardSkeleton />
          <FolderCardSkeleton />
        </>
      )}
      {folders.map((folder) => (
        <FolderCard folder={folder} key={folder.id} />
      ))}
      <CreateFolderPopover />
    </div>
  );
};

export default FoldersPage;
