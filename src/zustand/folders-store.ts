import { create } from "zustand";

import { signOut } from "next-auth/react";
import { CreateFolderInputType, Folder } from "@/actions/folder/types";
import { createFolder, findFolders } from "@/actions/folder";

interface FolderStore {
  folders: Array<Folder> | [];
  isPending: boolean;
  setFolder: (folder: Folder | undefined) => void;
  setFolders: (folders: Array<Folder>, clear?: boolean) => void;
  getFolders: (jwt: string | undefined) => void;
  createFolder: (folder: CreateFolderInputType) => void;
  clearFolders: () => void;
}

const useFolderStore = create<FolderStore>((set, get) => {
  return {
    folders: [],
    isPending: false,
    setFolder: (folder: Folder | undefined) => {
      if (!folder) return;
      const { folders: oldFolders } = get();
      const newFolders: Folder[] = [...oldFolders, folder];
      set({ folders: newFolders });
    },
    setFolders: (folders: Array<Folder>, clear = false) => {
      const { folders: oldFolders, clearFolders } = get();
      if (clear) clearFolders();

      const newFolders: Folder[] = [...oldFolders, ...folders];

      set({ folders: newFolders });
    },
    getFolders: async (jwt: string | undefined) => {
      if (!jwt) return;
      set({ isPending: true });
      const foldersLC = localStorage.getItem("folders");

      if (foldersLC) {
        set({ folders: JSON.parse(foldersLC) });
        return;
      }

      const { response } = await findFolders({ jwtoken: jwt });
      localStorage.setItem("folders", JSON.stringify(response?.data ?? []));
      set({ folders: response?.data ?? [], isPending: false });
    },
    createFolder: async (folder: CreateFolderInputType) => {
      const { setFolder } = get();
      if (!folder.jwtoken) return;

      set({ isPending: true });
      const { response } = await createFolder(folder);

      if (response?.statusCode === 401) {
        signOut();
      }

      if (response?.statusCode === 201 && response?.data) {
        setFolder(response?.data);
      }
      set({ isPending: false });
    },
    clearFolders: () => {
      localStorage.removeItem("folders");
      set({ folders: [] });
    },
  };
});

export default useFolderStore;
