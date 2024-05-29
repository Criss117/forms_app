import { FormComplete } from "@/actions/form";
import { create } from "zustand";

interface FormStore {
  loading: boolean;
  form: FormComplete | null;
  setForm: (form: FormComplete | undefined) => void;
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
