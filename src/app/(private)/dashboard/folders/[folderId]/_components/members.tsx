"use client";

import {
  Avatar,
  AvatarFallback,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import { userInitials } from "@/lib";
import { useFolderStore } from "@/zustand";

const Members = () => {
  const currentFolder = useFolderStore((state) => state.currentFolder);

  return (
    <div>
      <h3>Miembros</h3>
      <ul className="flex gap-2 mt-2">
        {currentFolder?.members &&
          currentFolder.members.map((member) => (
            <li key={member.id}>
              <Tooltip>
                <TooltipTrigger>
                  <Avatar>
                    <AvatarFallback className="bg-lightaccent-100">
                      <p className="font-bold">
                        {userInitials(member.name, member.surname)}
                      </p>
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-semibold">
                    {member.name} {member.surname}
                  </p>
                  <p>{member.email}</p>
                </TooltipContent>
              </Tooltip>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Members;
