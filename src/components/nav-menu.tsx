"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui";

import { NavMenuItems } from ".";
import { useNavMenu } from "@/hooks";

const NavMenu = () => {
  const { navInfo } = useNavMenu();

  const { currentFolders, folders } = navInfo;

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Carpetas</NavigationMenuTrigger>
          <NavigationMenuContent>
            {folders.own.length === 0 && folders.shared.length === 0 ? (
              <p>No tienes carpetas</p>
            ) : (
              <section className="my-5 space-y-5">
                <div className="shadow m-2 p-1">
                  <p className="font-bold px-5">Sus carpetas</p>
                  <NavMenuItems items={folders.own} />
                </div>

                <div className="shadow m-2 p-1">
                  <p className="font-bold px-5">Compartidas</p>
                  <NavMenuItems items={folders.shared} />
                </div>
              </section>
            )}
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Recientes</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavMenuItems items={currentFolders} />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavMenu;
