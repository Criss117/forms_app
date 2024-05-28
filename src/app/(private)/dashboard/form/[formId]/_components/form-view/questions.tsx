import { Question } from "@/actions/form";
import { UniqueDropAnswers, UniqueRadioAnswers } from ".";
import { QUESTION_TYPES } from "@/lib/constants";

interface Props {
  questions: Question[];
}

const Questions = ({ questions }: Props) => {
  return (
    <>
      {questions.map((question, index) => (
        <div key={question.id} className="border p-2">
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
        </div>
      ))}
    </>
  );
};

export default Questions;
