"use client";

import { useFormStore } from "@/zustand";
import { EditorModal, FormSkeleton } from "./_components";
import { Questions } from "./_components/form-view";

const FormPage = () => {
  const { form, loading } = useFormStore();

  return (
    <>
      {loading ? (
        <FormSkeleton />
      ) : (
        <>
          <section className="border mt-5 px-2 pb-2 space-y-2">
            <header className="pt-2 flex justify-between">
              <h2 className="text-2xl font-bold">{form?.name}</h2>
              <p className="tetx-sm text-gray-400">{form?.description}</p>
            </header>
            <section className="flex gap-2 flex-col">
              <Questions questions={form?.questions || []} />
            </section>
            <footer className="flex justify-end border">
              <EditorModal />
            </footer>
          </section>
        </>
      )}
    </>
  );
};

export default FormPage;
