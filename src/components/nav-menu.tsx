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
  const { navInfo, isPending } = useNavMenu();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navInfo.map(({ itemName, items }, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuTrigger>{itemName}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavMenuItems items={items} isPending={isPending} />
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavMenu;
