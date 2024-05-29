import { Question } from "@/actions/form";
import { Subtype } from "@/actions/question-types/types";
import { create } from "zustand";

interface QuestionEditorStore {
  editing: boolean;
  isSubtypeSelected: boolean;
  subtypeSelected: Subtype | null;
  isModalOpen: boolean;
  questionEditing: Question;
  setSubtypeSelected: (subtype: Subtype) => void;
  clearState: () => void;
  setIsOpenModal: (state?: boolean) => void;
  setQuestionToEdit: (question: Question) => void;
}

const initialState = {
  editing: false,
  isSubtypeSelected: false,
  subtypeSelected: null,
  isModalOpen: false,
  questionEditing: {} as Question,
};

const useQuestionEditorStore = create<QuestionEditorStore>((set, get) => ({
  editing: initialState.editing,
  isModalOpen: initialState.isModalOpen,
  isSubtypeSelected: initialState.isSubtypeSelected,
  subtypeSelected: initialState.subtypeSelected,
  questionEditing: initialState.questionEditing,

  setSubtypeSelected: (subtype: Subtype) => {
    set({ subtypeSelected: subtype, isSubtypeSelected: true });
  },

  setIsOpenModal: (state = !get().isModalOpen) => {
    set({ isModalOpen: state });
  },

  setQuestionToEdit: (question: Question) => {
    set({ editing: true, questionEditing: question });
  },

  clearState: () => set({ ...initialState }),
}));

export default useQuestionEditorStore;
