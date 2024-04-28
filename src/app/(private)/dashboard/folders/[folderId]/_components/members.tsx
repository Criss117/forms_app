"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  UserAvatar,
} from "@/components/ui";
import { firstLetterUppercase } from "@/lib";
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
                <TooltipTrigger className="cursor-default">
                  <UserAvatar>
                    {firstLetterUppercase(member.name, member.surname)}
                  </UserAvatar>
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
