"use client";

import { useFormStore } from "@/zustand";
import { EditorModal, FormSkeleton } from "./_components";

const FormPage = () => {
  const { form, loading } = useFormStore();

  return (
    <>
      {loading ? (
        <FormSkeleton />
      ) : (
        <>
          <section className="border mt-5 px-2 pb-2">
            <header className="py-2 flex justify-between">
              <h2>{form?.name}</h2>
              <p>{form?.description}</p>
            </header>
            <section className="flex gap-2 flex-col">
              {form?.questions.map((question, index) => (
                <div key={question.id} className="border p-2">
                  <h2 className="flex gap-2 items-center">
                    <span className="bg-lightaccent-100 rounded-full w-8 h-8 flex justify-center items-center font-semibold">
                      {index + 1}
                    </span>
                    <span className="text-xl font-semibold">
                      {question.question}
                    </span>
                  </h2>
                  <>
                    {question.answers.map((answer) => (
                      <p key={answer.id}>{answer.answer}</p>
                    ))}
                  </>
                </div>
              ))}
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
