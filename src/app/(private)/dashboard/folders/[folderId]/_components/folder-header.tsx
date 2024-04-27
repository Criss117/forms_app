"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

import { firtsLetterUppercase } from "@/lib";
import { useFolderStore } from "@/zustand";
import { Skeleton } from "@/components/ui";
import { FolderComplete } from "@/actions/folder/types";
import { USER_PERMISSIONS_LIST } from "@/lib/constants";

import { AddMemberPopover } from ".";

interface Props {
  folderApi: FolderComplete | undefined;
  statusCode?: number;
}

export const FolderHeader = ({ folderApi, statusCode }: Props) => {
  const { setCurrentFolder, clearCurrentFolder } = useFolderStore();

  useEffect(() => {
    if (!folderApi || statusCode === 404) {
      signOut();
    }

    setCurrentFolder(folderApi);

    return () => {
      clearCurrentFolder();
    };
  }, []);

  if (!folderApi) {
    return <FolderHeaderSkeleton />;
  }

  return (
    <header className="w-full py-5 border-b border-slate-500">
      <div className="flex justify-between w-[60%] mx-auto items-center">
        <div className="flex gap-x-2 items-center">
          <span
            className="
              bg-lightprimary-200 text-white 
              w-10 h-10 rounded-sm flex items-center 
              justify-center font-semibold text-xl"
          >
            {firtsLetterUppercase([folderApi.name])}
          </span>
          <h2>{folderApi.name}</h2>
        </div>

        {folderApi.owner && <AddMemberPopover />}

        {!folderApi.owner && folderApi.ownerUser && (
          <p className="flex flex-col">
            <span className="font-bold">
              de: {folderApi.ownerUser.name} {folderApi.ownerUser.surname}
            </span>
            <span className="text-sm">{folderApi.ownerUser.email}</span>
            <span className="text-sm font-semibold">
              {USER_PERMISSIONS_LIST[folderApi.permission].label}
            </span>
          </p>
        )}
      </div>
    </header>
  );
};

export const FolderHeaderSkeleton = () => {
  return (
    <header className="w-full py-5 border-b border-slate-500 h-20">
      <div className="flex justify-between w-[60%] mx-auto items-center">
        <Skeleton className="w-44 h-10 bg-white" />
        <Skeleton className="w-44 h-10 bg-white" />
      </div>
    </header>
  );
};
