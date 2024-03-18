import { PropsWithChildren } from "react";
import { AccountHeader } from "./account/_components";

const AccountLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="bg-lightbg-400 h-full flex justify-center items-center">
      <AccountHeader />
      {children}
    </main>
  );
};

export default AccountLayout;
