import { QuestionType } from "@/actions/question-types/types";
import { create } from "zustand";

interface QuestionEditorStore {
  isSubtypeSelected: boolean;
  subtypeSelected: QuestionType | null;
  setSubtypeSelected: (subtype: QuestionType) => void;
  clearState: () => void;
}

const initialState = {
  isSubtypeSelected: false,
  subtypeSelected: null,
};

const useQuestionEditorStore = create<QuestionEditorStore>((set) => ({
  isSubtypeSelected: initialState.isSubtypeSelected,
  subtypeSelected: initialState.subtypeSelected,

  setSubtypeSelected: (subtype: QuestionType) => {
    set({ subtypeSelected: subtype, isSubtypeSelected: true });
  },

  clearState: () => set({ ...initialState }),
}));

export default useQuestionEditorStore;
