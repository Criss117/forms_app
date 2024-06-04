"use client";

import { Button, Skeleton, UserAvatar } from "@/components/ui";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { firstLetterUppercase } from "@/lib";
import { signOut } from "next-auth/react";

interface Props {
  user: {
    name: string;
    surname: string;
    email: string;
    jwt: string;
  };
}

export const UserSheetSkeleton = () => {
  return <Skeleton className="bg-red-500 w-10 h-10 rounded-full" />;
};

export const UserSheet = ({ user }: Props) => {
  return (
    <Sheet>
      <SheetTrigger>
        <UserAvatar>{firstLetterUppercase(user.name, user.surname)}</UserAvatar>
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between">
        <SheetHeader>
          <SheetTitle>
            {user.name} {user.surname}
          </SheetTitle>
        </SheetHeader>
        <SheetFooter>
          <Button variant="destructive" onClick={() => signOut()}>
            Cerrar Sesión
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
