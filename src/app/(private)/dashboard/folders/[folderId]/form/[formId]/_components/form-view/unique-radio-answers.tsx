import { Answer } from "@/actions/form";
import { Label, RadioGroup, RadioGroupItem } from "@/components/ui";

interface Props {
  answers: Array<Answer>;
}

const UniqueRadioAnswers = ({ answers }: Props) => {
  return (
    <RadioGroup className="mt-5 px-2">
      {answers.map((answer) => (
        <div
          className="flex items-center space-x-2 p-2 rounded-md"
          key={answer.id}
        >
          <RadioGroupItem
            className="w-5 h-5"
            value={`option-${answer.id}`}
            id={`option-${answer.id}`}
          />
          <Label htmlFor={`option-${answer.id}`} className="cursor-pointer">
            {answer.answer}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default UniqueRadioAnswers;
