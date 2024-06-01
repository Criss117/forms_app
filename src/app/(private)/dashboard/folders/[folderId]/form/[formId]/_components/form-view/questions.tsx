"use client";
import { QUESTION_TYPES, USER_PERMISSIONS } from "@/lib/constants";
import { Question } from "@/actions/form";

import { EditButton, UniqueDropAnswers, UniqueRadioAnswers } from ".";
import { useQuestionEditorStore } from "@/zustand";

interface Props {
  owner: boolean;
  permission: USER_PERMISSIONS;
  questions: Question[];
}

const Questions = ({ questions, owner, permission }: Props) => {
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
          <EditButton
            owner={owner}
            permission={permission}
            onClick={() => openEdit(question)}
          />
        </div>
      ))}
    </>
  );
};

export default Questions;
