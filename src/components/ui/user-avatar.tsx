import { PropsWithChildren } from "react";
import { Avatar, AvatarFallback } from "./avatar";
import { cn } from "@/lib";
import { string } from "zod";

interface Props extends PropsWithChildren {
  rounded?: "none" | "full" | "sm";
  className?: string;
}

const UserAvatar = ({ children, rounded }: Props) => {
  return (
    <Avatar className={cn(`rounded-${rounded}`, string)}>
      <AvatarFallback
        className={cn("bg-lightaccent-100", `rounded-${rounded}`, string)}
      >
        <p className="font-bold">{children}</p>
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
