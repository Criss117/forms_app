"use client";

import { signOut } from "next-auth/react";
import { FolderComplete } from "@/actions/folder/types";
import { Button } from "@/components/ui";
import { UserRoundPlus } from "lucide-react";

interface Props {
  folder: FolderComplete | undefined;
  statusCode?: number;
}

const FolderHeader = ({ folder, statusCode }: Props) => {
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
            C
          </span>
          <h2>{name}</h2>
        </div>

        <Button variant={"outline"} className="gap-x-2">
          <UserRoundPlus />
          Agregar Miembro
        </Button>
      </div>
    </header>
  );
};

export default FolderHeader;
