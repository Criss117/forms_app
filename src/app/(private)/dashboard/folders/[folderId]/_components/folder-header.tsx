"use client";

import { firstLetterUppercase } from "@/lib";
import { useFolderStore } from "@/zustand";
import { Skeleton, UserAvatar } from "@/components/ui";
import { USER_PERMISSIONS_LIST } from "@/lib/constants";
import { PropsWithIsPending } from "@/lib/models";

import { AddMemberPopover } from ".";

export const FolderHeaderSkeleton = () => {
  return (
    <header className="w-full py-5 border-b border-slate-500">
      <div className="flex justify-between w-[60%] mx-auto items-center">
        <Skeleton className="w-44 h-[42px] bg-white" />
        <Skeleton className="w-44 h-[42px] bg-white" />
      </div>
    </header>
  );
};

export const FolderHeader = ({ isPending }: PropsWithIsPending) => {
  const { currentFolder } = useFolderStore();

  if (isPending || !currentFolder) {
    return <FolderHeaderSkeleton />;
  }

  return (
    <header className="w-full py-5 border-b border-slate-500">
      <div className="flex justify-between w-[60%] mx-auto items-center">
        <div className="flex gap-x-2 items-center">
          <UserAvatar rounded="sm">
            {firstLetterUppercase(currentFolder?.name || "")}
          </UserAvatar>
          <h2>{currentFolder?.name}</h2>
        </div>

        {currentFolder?.owner && <AddMemberPopover />}

        {!currentFolder?.owner && currentFolder?.ownerUser && (
          <p className="flex flex-col">
            <span className="font-bold">
              de: {currentFolder.ownerUser.name}{" "}
              {currentFolder.ownerUser.surname}
            </span>
            <span className="text-sm">{currentFolder.ownerUser.email}</span>
            <span className="text-sm font-semibold">
              {USER_PERMISSIONS_LIST[currentFolder.permission].label}
            </span>
          </p>
        )}
      </div>
    </header>
  );
};
