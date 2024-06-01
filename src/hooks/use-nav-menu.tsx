"use client";

import { useEffect, useState } from "react";
import { useFolderStore } from "@/zustand";
import { PRIVATE_ROUTES } from "@/lib/constants";

type NavFolder = {
  name: string;
  href: string;
};

type NavInfo = {
  folders: {
    own: Array<NavFolder> | [];
    shared: Array<NavFolder> | [];
  };
  currentFolders: Array<NavFolder> | [];
};

const initialNavInfo: NavInfo = {
  folders: {
    own: [],
    shared: [],
  },
  currentFolders: [],
};

const useNavMenu = () => {
  const [navInfo, setNavInfo] = useState(initialNavInfo);
  const { folders, sharedFolders } = useFolderStore();

  useEffect(() => {
    if (folders.length === 0 && sharedFolders.length === 0) return;

    const navFolders = {
      own: folders.map((folder) => ({
        name: folder.name,
        href: `${PRIVATE_ROUTES.FOLDERS_HOME}/${folder.id}`,
      })),
      shared: sharedFolders.map((folder) => ({
        name: folder.name,
        href: `${PRIVATE_ROUTES.FOLDERS_HOME}/${folder.id}`,
      })),
    };

    setNavInfo((prev) => ({
      ...prev,
      folders: navFolders,
    }));
  }, [folders]);

  return {
    navInfo,
  };
};

export default useNavMenu;
