import { QuestionType } from "@/actions/question_types/types";
import { create } from "zustand";

interface QuestionTypesStore {
  questionTypes: Array<QuestionType> | [];
}

const useQuestionTypes = create<QuestionTypesStore>((set) => ({
  questionTypes: [],
}));
