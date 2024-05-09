import { create } from "zustand";

import { QuestionType } from "@/actions/question-types/types";
import { LOCAL_STORAGE_KEYS } from "@/lib/constants";
interface QuestionTypesStore {
  questionTypes: Array<QuestionType> | [];
  typeSelected: QuestionType | null;
  setQuestionTypes: (questionType: Array<QuestionType>) => void;
  getQuestionTypes: () => Array<QuestionType> | [];
  selectType: (typeId: number) => QuestionType | null;
  clearTypeSelected: () => void;
  clearState: () => void;
}

const useQuestionTypesStore = create<QuestionTypesStore>((set, get) => ({
  questionTypes: [],
  typeSelected: null,
  setQuestionTypes: (newQuestionTypes: Array<QuestionType>) => {
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.QUESTION_TYPES,
      JSON.stringify(newQuestionTypes)
    );
    set({ questionTypes: newQuestionTypes });
  },
  getQuestionTypes: () => {
    const { questionTypes: current } = get();

    if (current.length > 0) {
      return current;
    }

    const newQuestionTypes = localStorage.getItem(
      LOCAL_STORAGE_KEYS.QUESTION_TYPES
    );

    if (newQuestionTypes) {
      set({ questionTypes: JSON.parse(newQuestionTypes) });
      return JSON.parse(newQuestionTypes);
    }
    return [];
  },
  selectType: (typeId: number) => {
    const { questionTypes } = get();

    const typeSelected = questionTypes.find((type) => type.id === typeId);

    if (!typeSelected) return null;

    set({ typeSelected });

    return typeSelected;
  },
  clearTypeSelected: () => set({ typeSelected: null }),
  clearState: () => {
    set({ questionTypes: [], typeSelected: null });
  },
}));

export default useQuestionTypesStore;
