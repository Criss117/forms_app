"use client";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";
import { NavBar } from "./_components";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <SessionProvider>
      <main className="bg-lightbg-400 h-full">
        <NavBar />
        {children}
      </main>
    </SessionProvider>
  );
};

export default layout;
