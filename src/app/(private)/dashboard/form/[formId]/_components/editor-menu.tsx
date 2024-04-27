"use client";

import { useState } from "react";

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import { useQuestionTypesStore } from "@/zustand";
import { QuestionType } from "@/actions/question-types/types";
import { CircleHelp } from "lucide-react";

interface Props {
  type: QuestionType | null;
  onClick: () => void;
}

const EditorButton = ({ type, onClick }: Props) => {
  if (!type) return null;

  return (
    <div key={type.id} className="h-20 relative">
      <Button asChild className="h-full w-full" onClick={onClick}>
        <p className="cursor-pointer">{type.name}</p>
      </Button>
      <Tooltip>
        <TooltipTrigger className="cursor-default absolute right-2 top-2">
          <CircleHelp className="text-white" />
        </TooltipTrigger>
        <TooltipContent>
          <p>{type.description}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

const EditorMenu = () => {
  const { questionTypes, typeSelected, selectType } = useQuestionTypesStore();

  return (
    <div className="grid grid-cols-2 gap-x-10">
      <section className="flex gap-2 flex-col">
        {questionTypes.map((type) => (
          <EditorButton
            type={type}
            onClick={() => selectType(type.id)}
            key={type.id}
          />
        ))}
      </section>
      <section className="flex gap-2 flex-col">
        {typeSelected?.subTypes.map((type) => (
          <EditorButton
            type={type}
            onClick={() => console.log(type)}
            key={type.id}
          />
        ))}
      </section>
    </div>
  );
};

export default EditorMenu;
