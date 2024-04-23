import { create } from "zustand";

import { FindALlFolders, Folder, FolderComplete } from "@/actions/folder/types";

interface FolderStore {
  currentFolder: FolderComplete | undefined;
  folders: Array<Folder> | [];
  sharedFolders: Array<Folder> | [];
  setCurrentFolder: (folder: FolderComplete | undefined) => void;
  setFolder: (folder: Folder | undefined) => void;
  setFolders: (folders: FindALlFolders) => void;
  clearCurrentFolder: () => void;
  clearFolders: () => void;
}

const useFolderStore = create<FolderStore>((set, get) => {
  return {
    folders: [],
    sharedFolders: [],
    currentFolder: undefined,
    setCurrentFolder: (folder: FolderComplete | undefined) => {
      set({ currentFolder: folder });
    },
    setFolder: (folder: Folder | undefined) => {
      if (!folder) return;
      const { folders: oldFolders } = get();
      const newFolders: Folder[] = [...oldFolders, folder];
      set({ folders: newFolders });
    },
    setFolders: (newFolders: FindALlFolders) => {
      const { clearFolders } = get();
      clearFolders();

      set({
        folders: newFolders.ownerFolders,
        sharedFolders: newFolders.sharedFolders,
      });
    },
    clearFolders: () => {
      localStorage.removeItem("folders");
      set({ folders: [] });
    },
    clearCurrentFolder: () => {
      set({ currentFolder: undefined });
    },
  };
});

export default useFolderStore;
