"use client";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";
import { NavBar, SideBar } from "./dashboard/_components";
import { Toaster } from "@/components/ui";

const PrivateLayout = ({ children }: PropsWithChildren) => {
  return (
    <SessionProvider>
      <main className="bg-lightbg-400 h-full">
        <Toaster />
        <NavBar />
        <SideBar>{children}</SideBar>
      </main>
    </SessionProvider>
  );
};

export default PrivateLayout;
