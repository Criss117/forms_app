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
import { useRecentStore } from "@/zustand";
import Link from "next/link";
import { FileSliders, Folder } from "lucide-react";

const NavMenu = () => {
  const { navInfo } = useNavMenu();
  const { recent } = useRecentStore();

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

                {folders.shared.length > 0 && (
                  <div className="shadow m-2 p-1">
                    <p className="font-bold px-5">Compartidas</p>
                    <NavMenuItems items={folders.shared} />
                  </div>
                )}
              </section>
            )}
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Recientes</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col w-[300px] gap-y-2 m-2">
              {recent.map(({ url, type, name }) => (
                <li key={url}>
                  <Link href={url}>
                    <div className="flex items-center gap-2 p-1 rounded-sm hover:bg-lightbg-300/50">
                      {type === "folder" ? <Folder /> : <FileSliders />}
                      {name}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavMenu;
