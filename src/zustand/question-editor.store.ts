import { QuestionType } from "@/actions/question-types/types";
import { create } from "zustand";

interface QuestionEditorStore {
  isSubtypeSelected: boolean;
  subtypeSelected: QuestionType | null;
  isModalOpen: boolean;
  setSubtypeSelected: (subtype: QuestionType) => void;
  clearState: () => void;
  setIsOpenModal: (state?: boolean) => void;
}

const initialState = {
  isSubtypeSelected: false,
  subtypeSelected: null,
  isModalOpen: false,
};

const useQuestionEditorStore = create<QuestionEditorStore>((set, get) => ({
  isModalOpen: initialState.isModalOpen,
  isSubtypeSelected: initialState.isSubtypeSelected,
  subtypeSelected: initialState.subtypeSelected,

  setSubtypeSelected: (subtype: QuestionType) => {
    set({ subtypeSelected: subtype, isSubtypeSelected: true });
  },

  setIsOpenModal: (state = !get().isModalOpen) => {
    set({ isModalOpen: state });
  },

  clearState: () => set({ ...initialState }),
}));

export default useQuestionEditorStore;
