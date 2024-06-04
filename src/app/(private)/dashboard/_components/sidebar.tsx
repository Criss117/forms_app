"use client";

import { PropsWithChildren } from "react";
import { SideBarFolders, SideBarHeader } from ".";

const SideBar = ({ children }: PropsWithChildren) => {
  return (
    <div className="max-w-screen-xl flex mx-auto justify-center">
      <div className="flex w-full mx-2 gap-x-10">
        <aside className="w-2/12 hidden md:flex md:flex-col">
          <SideBarHeader />
          <SideBarFolders />
        </aside>
        <div className="w-[90%] md:w-10/12 mx-auto md:mx-0">{children}</div>
      </div>
    </div>
  );
};

export default SideBar;
