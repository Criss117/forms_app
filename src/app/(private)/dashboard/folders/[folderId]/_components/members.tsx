"use client";

import { UserMinus } from "lucide-react";

import { CommonPopover } from "@/components";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  UserAvatar,
} from "@/components/ui";
import { useMemberActions } from "@/hooks";
import { firstLetterUppercase } from "@/lib";
import { useFolderStore } from "@/zustand";

const MemberAlert = ({ memberId }: { memberId: number }) => {
  const { deleteMember } = useMemberActions();

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive" asChild>
          <p>
            <UserMinus />
          </p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Está seguro de eliminar a este miembro?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteMember(memberId)}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const Members = () => {
  const currentFolder = useFolderStore((state) => state.currentFolder);

  return (
    <div>
      <h3>Miembros</h3>
      <ul className="flex gap-2 mt-2">
        {currentFolder?.members &&
          currentFolder.members.map((member) => (
            <li key={member.id}>
              <CommonPopover
                trigger={
                  <UserAvatar>
                    {firstLetterUppercase(member.name, member.surname)}
                  </UserAvatar>
                }
              >
                <div className="flex gap-2 justify-between items-center px-5">
                  <div>
                    <p className="font-semibold">
                      {member.name} {member.surname}
                    </p>
                    <p>{member.email}</p>
                  </div>
                  <MemberAlert memberId={member.id} />
                </div>
              </CommonPopover>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Members;
