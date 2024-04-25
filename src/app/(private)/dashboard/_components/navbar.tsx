"use client";
import { useSession } from "next-auth/react";

import { NavMenu } from "@/components";
import { FormsAppTitle } from "@/components/ui";
import { PRIVATE_ROUTES } from "@/lib/constants";

import { UserSheet, CreateFormPopover, UserSheetSkeleton } from ".";

const NavBar = () => {
  const { data, status } = useSession();

  return (
    <header className="bg-white shadow-sm flex justify-between px-5 py-2">
      <div className="flex items-center gap-14">
        <FormsAppTitle href={PRIVATE_ROUTES.DASHBOARD_HOME} />
        <NavMenu />
        <CreateFormPopover site="sm" />
      </div>

      <div className="flex items-center">
        {status === "authenticated" ? (
          <UserSheet user={data?.user} />
        ) : (
          <UserSheetSkeleton />
        )}
      </div>
    </header>
  );
};

export default NavBar;
