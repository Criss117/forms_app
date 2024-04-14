"use client";

import { useEffect, useState } from "react";
import { useFolderStore } from "@/zustand";
import { PRIVATE_ROUTES } from "@/lib/constants";

interface NavInfo {
  itemName: string;
  items:
    | Array<{
        name: string;
        href: string;
      }>
    | [];
}

const initialNavInfo: Array<NavInfo> = [
  {
    itemName: "Carpetas",
    items: [],
  },
  {
    itemName: "Recientes",
    items: [],
  },
];

const useNavMenu = () => {
  const [navInfo, setNavInfo] = useState<Array<NavInfo>>(initialNavInfo);
  const { folders } = useFolderStore();

  useEffect(() => {
    if (folders.length === 0) return;
    const newNavinfo = navInfo.map((item) => {
      if (item.itemName === "Carpetas") {
        return {
          itemName: "Carpetas",
          items: folders.map((folder) => ({
            name: folder.name,
            href: `${PRIVATE_ROUTES.FOLDERS_HOME}/${folder.id}`,
          })),
        };
      }
      return item;
    });

    setNavInfo(newNavinfo);
  }, [folders]);

  return {
    navInfo,
  };
};

export default useNavMenu;
