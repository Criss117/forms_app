"use client";

import { useFolderStore } from "@/zustand";
import {
  CreateFolderPopover,
  FolderCard,
  FolderCardSkeleton,
} from "./_components";
import { Separator } from "@/components/ui";

const FoldersPage = () => {
  const { folders, sharedFolders } = useFolderStore();

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold">Carpetas propias</h3>
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

      <Separator className="my-10" />

      <h3 className="text-xl font-semibold">Carpetas compartidas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 mt-5">
        {folders.length === 0 && (
          <>
            <FolderCardSkeleton />
            <FolderCardSkeleton />
          </>
        )}
        {sharedFolders.map((folder) => (
          <FolderCard folder={folder} key={folder.id} />
        ))}
      </div>
    </div>
  );
};

export default FoldersPage;
