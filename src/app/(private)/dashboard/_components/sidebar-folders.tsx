"use client";

import { useFolderStore } from "@/zustand";
import { FoldersDetails, FoldersDetailsSkeleton } from ".";

const SideBarFolders = () => {
  const { folders } = useFolderStore();
  return (
    <>
      {folders.length === 0 && <FoldersDetailsSkeleton />}
      <ul>
        {folders.map(({ id, name }) => (
          <FoldersDetails key={id} id={id} name={name} />
        ))}
      </ul>
    </>
  );
};

export default SideBarFolders;
