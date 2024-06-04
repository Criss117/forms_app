import { create } from "zustand";

export type Recent = {
  url: string;
  type: "folder" | "form";
  name: string;
};

interface RecentStore {
  recent: Recent[];
  loadOnLS: () => void;
  addRecent: (newRecent: Recent) => void;
  clearRecent: () => void;
}

const useRecentStore = create<RecentStore>((set, get) => ({
  recent: [],
  loadOnLS: () => {
    const oldRecent = localStorage.getItem("recent");

    if (oldRecent) {
      set({ recent: JSON.parse(oldRecent) });
    }
  },
  addRecent: (newRecent: Recent) => {
    if (newRecent.url === "") return;
    const oldRecent = get().recent;

    if (oldRecent.find((r) => r.url === newRecent.url)) return;

    if (oldRecent.length >= 5) {
      oldRecent.shift();
    }

    localStorage.setItem("recent", JSON.stringify([...oldRecent, newRecent]));
    set({ recent: [...oldRecent, newRecent] });
  },
  clearRecent: () => {
    localStorage.removeItem("recent");
    set({ recent: [] });
  },
}));

export default useRecentStore;
