"use client";

import { sleep } from "@/lib";
import { useFolderStore } from "@/zustand";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";

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
];

const useNavMenu = () => {
  const [navInfo, setNavInfo] = useState<Array<NavInfo>>(initialNavInfo);
  const { data, status } = useSession();
  const [isPending, setTransition] = useTransition();
  const { folders, getFolders } = useFolderStore();

  useEffect(() => {
    if (status === "loading" || data === undefined || data?.user?.jwt === null)
      return;

    setTransition(async () => {
      await sleep(4000);
      getFolders(data?.user?.jwt);
    });
  }, [data]);

  useEffect(() => {
    if (folders.length === 0) return;
    const newNavinfo = navInfo.map((item) => {
      if (item.itemName === "Carpetas") {
        return {
          itemName: "Carpetas",
          items: folders.map((folder) => ({
            name: folder.name,
            href: `/folder/${folder.id}`,
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
