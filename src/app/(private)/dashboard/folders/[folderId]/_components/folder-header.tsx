"use client";

import { signOut } from "next-auth/react";
import { UserRoundPlus } from "lucide-react";

import { FolderComplete } from "@/actions/folder/types";
import { Button, Skeleton } from "@/components/ui";
import { getCharUpperCase } from "@/lib";
import AddMemberPopover from "./add-member-popover";

interface Props {
  folder: FolderComplete | undefined;
  statusCode?: number;
}

export const FolderHeader = ({ folder, statusCode }: Props) => {
  if (!folder || statusCode === 404) {
    signOut();
    return null;
  }
  const { name } = folder;

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
            {getCharUpperCase(name)}
          </span>
          <h2>{name}</h2>
        </div>
        <AddMemberPopover />
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
