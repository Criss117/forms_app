"use client";

import { useFolderStore } from "@/zustand";
import { CreateFolderPopover, FolderCard, FolderCardSkeleton } from ".";

const FoldersView = () => {
  const { folders } = useFolderStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10">
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

export default FoldersView;
