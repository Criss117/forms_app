import { FormComplete, Question } from "@/actions/form";
import { create } from "zustand";

interface FormStore {
  loading: boolean;
  form: FormComplete | null;
  setForm: (form: FormComplete | undefined) => void;
  setNewQuestion: (newQuestion: Question) => void;
  clearForm: () => void;
  handleLoading: (loading: boolean) => void;
}

const initialState = {
  loading: true,
  form: null,
};

const useFormStore = create<FormStore>((set, get) => {
  return {
    form: initialState.form,
    loading: initialState.loading,
    setForm: (form: FormComplete | undefined) => {
      if (!form) return;
      set({ form });
    },
    setNewQuestion: (newQuestion: Question) => {
      const currentForm = get().form;
      if (!currentForm) return;

      let added: boolean = false;
      const newQuestions = currentForm.questions.map((question) => {
        if (question.id === newQuestion.id) {
          added = true;
          return newQuestion;
        }
        return question;
      });

      if (!added) {
        newQuestions.push(newQuestion);
      }

      set({ form: { ...currentForm, questions: newQuestions } });
    },
    clearForm: () => {
      set({ form: null });
    },
    handleLoading: (loading: boolean) => {
      if (loading === null) {
        set({ loading: !get().loading });
        return;
      }
      set({ loading });
    },
  };
});

export default useFormStore;
