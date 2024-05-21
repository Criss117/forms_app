"use client";

import { FieldArrayWithId } from "react-hook-form";
import { X } from "lucide-react";

import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "@/components/ui";

interface Props {
  fields: FieldArrayWithId<
    {
      formId: string;
      required: boolean;
      question: string;
      subtypeId: number;
      answers: {
        id: number;
        answer: string;
      }[];
    },
    "answers",
    "id"
  >[];
  form: any;
  isPending: boolean;
  remove: (index?: number | number[]) => void;
}

const AnswersEditor = ({ form, fields, isPending, remove }: Props) => {
  return (
    <>
      {fields.map((field, index) => (
        <fieldset
          className="flex w-1/2 gap-2 items-center relative"
          key={field.id}
        >
          <FormItem>
            <FormControl>
              <Input
                className="hidden"
                disabled={isPending}
                type="number"
                {...form.control.register(`answers.${index}.id`)}
              />
            </FormControl>
            <FormMessage className="bg-destructive/20 border-l-4 border-destructive" />
          </FormItem>
          <FormItem className="w-full">
            <FormControl>
              <Input
                disabled={isPending}
                type="text"
                {...form.control.register(`answers.${index}.answer`)}
              />
            </FormControl>
            <FormMessage className="bg-destructive/20 border-l-4 border-destructive" />
          </FormItem>
          {fields.length > 1 && (
            <Button
              onClick={() => {
                remove(index);
              }}
              type="button"
              className="h-8 w-20 rounded-full absolute -right-24"
            >
              <p>
                <X className="w-5 h-5 text-white font-bold" />
              </p>
            </Button>
          )}
        </fieldset>
      ))}
    </>
  );
};

export default AnswersEditor;
