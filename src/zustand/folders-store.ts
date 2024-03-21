import { create } from "zustand";

import { Folder } from "@/actions/folder/types";
import { findFolders } from "@/actions/folder";

interface FolderStore {
  folders: Array<Folder>;
  getFolders: (jwt: string | undefined) => void;
  clearFolders: () => void;
}

const useFolderStore = create<FolderStore>((set, get) => ({
  folders: [],
  getFolders: async (jwt: string | undefined) => {
    if (!jwt) return;
    const foldersLC = localStorage.getItem("folders");

    if (foldersLC) {
      set({ folders: JSON.parse(foldersLC) });
      return;
    }

    const { response } = await findFolders({ jwtoken: jwt });
    localStorage.setItem("folders", JSON.stringify(response?.data ?? []));
    set({ folders: response?.data ?? [] });
  },
  clearFolders: () => {
    localStorage.removeItem("folders");
    set({ folders: [] });
  },
}));

export default useFolderStore;
