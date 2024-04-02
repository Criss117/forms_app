import { create } from "zustand";

import { Folder } from "@/actions/folder/types";

interface FolderStore {
  folders: Array<Folder> | [];
  setFolder: (folder: Folder | undefined) => void;
  setFolders: (folders: Array<Folder>) => void;
  clearFolders: () => void;
}

const useFolderStore = create<FolderStore>((set, get) => {
  return {
    folders: [],
    setFolder: (folder: Folder | undefined) => {
      if (!folder) return;
      const { folders: oldFolders } = get();
      const newFolders: Folder[] = [...oldFolders, folder];
      set({ folders: newFolders });
    },
    setFolders: (newFolders: Array<Folder>) => {
      const { clearFolders } = get();
      clearFolders();
      set({ folders: newFolders });
    },
    clearFolders: () => {
      localStorage.removeItem("folders");
      set({ folders: [] });
    },
  };
});

export default useFolderStore;
