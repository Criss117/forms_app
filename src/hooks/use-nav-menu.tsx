"use client";

import { useEffect, useState } from "react";
import { useFolderStore } from "@/zustand";

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
  const { folders, isPending } = useFolderStore();

  useEffect(() => {
    if (folders.length === 0) return;
    const newNavinfo = navInfo.map((item) => {
      if (item.itemName === "Carpetas") {
        return {
          itemName: "Carpetas",
          items: folders.map((folder) => ({
            name: folder.name,
            href: `/dashboard/folder/${folder.id}`,
          })),
        };
      }
      return item;
    });

    setNavInfo(newNavinfo);
  }, [folders]);

  return {
    navInfo,
    isPending,
  };
};

export default useNavMenu;
