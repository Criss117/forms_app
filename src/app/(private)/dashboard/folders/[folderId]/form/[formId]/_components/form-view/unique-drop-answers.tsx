"use client";

import { Answer } from "@/actions/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

interface Props {
  answers: Array<Answer>;
}

const UniqueDropAnswers = ({ answers }: Props) => {
  return (
    <Select>
      <SelectTrigger className="w-3/12 mt-5">
        <SelectValue placeholder="Elija una opción" />
      </SelectTrigger>
      <SelectContent>
        {answers.map((answer) => (
          <SelectItem value={`${answer.id}`} key={answer.id}>
            {answer.answer}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default UniqueDropAnswers;
