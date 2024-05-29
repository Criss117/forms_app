"use client";
import { Settings2 } from "lucide-react";

import { QUESTION_TYPES } from "@/lib/constants";
import { CommonPopover } from "@/components";
import { Question } from "@/actions/form";
import { Button } from "@/components/ui";

import { UniqueDropAnswers, UniqueRadioAnswers } from ".";
import { useQuestionEditorStore } from "@/zustand";

interface Props {
  questions: Question[];
}

const Questions = ({ questions }: Props) => {
  const { setQuestionToEdit, setIsOpenModal, setSubtypeSelected } =
    useQuestionEditorStore();

  const openEdit = (question: Question) => {
    setQuestionToEdit(question);
    setIsOpenModal(true);
    setSubtypeSelected(question.subtype);
  };

  return (
    <>
      {questions.map((question, index) => (
        <div key={question.id} className="border p-2 relative">
          <h2 className="flex gap-2 items-center">
            <span className="bg-lightaccent-100 rounded-full w-8 h-8 flex justify-center items-center font-semibold">
              {index + 1}
            </span>
            <span className="text-xl font-semibold">{question.question}</span>
          </h2>
          {question.subtype.id === QUESTION_TYPES.UNIQUE_CHOISE && (
            <UniqueRadioAnswers answers={question.answers} />
          )}
          {question.subtype.id === QUESTION_TYPES.UNIQUE_CHOISE_DP && (
            <UniqueDropAnswers answers={question.answers} />
          )}
          <div className="absolute right-[10px] top-[10px]">
            <CommonPopover
              trigger={
                <Button
                  variant="ghost"
                  className="rounded-full bg-lightprimary-200 hover:bg-lightprimary-200/80 transition-colors"
                  asChild
                >
                  <p>
                    <Settings2 className="text-white w-full h-full" />
                  </p>
                </Button>
              }
            >
              <div className="flex flex-col gap-2 mt-10">
                <Button
                  onClick={() => {
                    openEdit(question);
                  }}
                >
                  Editar
                </Button>
                <Button variant="destructive">Eliminar</Button>
              </div>
            </CommonPopover>
          </div>
        </div>
      ))}
    </>
  );
};

export default Questions;
