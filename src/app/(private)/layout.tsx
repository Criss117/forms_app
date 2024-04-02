"use client";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";
import { NavBar, SideBar } from "./dashboard/_components";

const PrivateLayout = ({ children }: PropsWithChildren) => {
  return (
    <SessionProvider>
      <main className="bg-lightbg-400 h-full">
        <NavBar />
        <SideBar>{children}</SideBar>
      </main>
    </SessionProvider>
  );
};

export default PrivateLayout;
