"use client";

import Link from "next/link";
import { Folder } from "lucide-react";

import { useFolderStore } from "@/zustand";
import { FoldersDetails, FoldersDetailsSkeleton } from ".";
import { Separator } from "@/components/ui";
import { PRIVATE_ROUTES } from "@/lib/constants";

const SideBarFolders = () => {
  const { folders, sharedFolders } = useFolderStore();
  return (
    <>
      <div>
        <Separator className="bg-black my-4" />
        <p className="font-bold">Sus Carpetas</p>
        {folders.length === 0 && <FoldersDetailsSkeleton />}
        <ul className="flex flex-col gap-5 mt-5">
          {folders.map(({ id, name }) => (
            <Link
              key={id}
              href={`${PRIVATE_ROUTES.FOLDERS_HOME}/${id}`}
              className="flex hover:bg-gray-200 p-2 rounded-lg"
            >
              <Folder className="mr-2" />
              {name}
              {/* <FoldersDetails key={id} id={id} name={name} /> */}
            </Link>
          ))}
        </ul>
      </div>
      {sharedFolders.length > 0 && (
        <div className="mt-8 border-black">
          <Separator className="bg-black my-4" />
          <p className="font-bold">Carpetas Compartidas</p>
          <ul className="flex flex-col gap-5 mt-5">
            {sharedFolders.map(({ id, name }) => (
              <Link
                key={id}
                href={`${PRIVATE_ROUTES.FOLDERS_HOME}/${id}`}
                className="flex hover:bg-gray-200 p-2 rounded-lg"
              >
                <Folder className="mr-2" />
                Encuestas
                {/* <FoldersDetails key={id} id={id} name={name} /> */}
              </Link>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SideBarFolders;
