"use client";

import { NavMenu } from "@/components";
import { Button, FormsAppTitle } from "@/components/ui";
import { PRIVATE_ROUTES } from "@/lib/constants";

const NavBar = () => {
  return (
    <header className="bg-white shadow-sm flex justify-between px-5 py-2">
      <div className="flex items-center gap-14">
        <FormsAppTitle href={PRIVATE_ROUTES.DASHBOARD_HOME} />
        <NavMenu />
        <Button variant={"default"} className="bg-lightaccent-100">
          Crear
        </Button>
      </div>

      <div className="flex items-center">
        <p>usuario</p>
      </div>
    </header>
  );
};

export default NavBar;
