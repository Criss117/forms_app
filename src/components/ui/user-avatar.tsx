import { PropsWithChildren } from "react";
import { Avatar, AvatarFallback } from "./avatar";

const UserAvatar = ({ children }: PropsWithChildren) => {
  return (
    <Avatar>
      <AvatarFallback className="bg-lightaccent-100">
        <p className="font-bold">{children}</p>
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
