"use client";

import { useFolderStore } from "@/zustand";
import { FoldersDetails, FoldersDetailsSkeleton } from ".";
import { Separator } from "@/components/ui";

const SideBarFolders = () => {
  const { folders, sharedFolders } = useFolderStore();
  return (
    <>
      <div>
        <Separator className="bg-black my-4" />
        <p className="font-bold">Sus Carpetas</p>
        {folders.length === 0 && <FoldersDetailsSkeleton />}
        <ul>
          {folders.map(({ id, name }) => (
            <FoldersDetails key={id} id={id} name={name} />
          ))}
        </ul>
      </div>
      {sharedFolders.length > 0 && (
        <div className="mt-8 border-black">
          <Separator className="bg-black my-4" />
          <p className="font-bold">Carpetas Compartidas</p>
          <ul>
            {sharedFolders.map(({ id, name }) => (
              <FoldersDetails key={id} id={id} name={name} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SideBarFolders;
