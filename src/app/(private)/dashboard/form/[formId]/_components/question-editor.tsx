"use client";
import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";

import { FormError } from "@/components/form";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Textarea,
} from "@/components/ui";
import { useQuestionEditorStore } from "@/zustand";
import { useQuestionEditor } from "@/hooks";
import {
  FORM_INPUTS,
  MULTIPLE_CHOISE_LIMIT,
  MultipleChoiceInput,
} from "@/lib/constants";

const QuestionEditor = () => {
  const { MULTIPLE_CHOICE_INPUTS } = FORM_INPUTS;

  const { error, form, isPending, createQuestionSubmit } = useQuestionEditor();
  const { subtypeSelected, clearState } = useQuestionEditorStore();

  const [answers, setAnswers] = useState(() => MULTIPLE_CHOICE_INPUTS);

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  const hiddenAnswer = (answerId: number) => {
    if (isPending) return;
    if (answers.length < 2) return;

    setAnswers(answers.filter((input) => input.id !== answerId));
  };

  const addAnswer = () => {
    if (isPending) return;
    if (answers.length >= MULTIPLE_CHOISE_LIMIT) return;

    let index = -1;

    const currentIndex = answers.map((input) => input.id);

    for (let i = 0; i < answers.length; i++) {
      if (currentIndex.includes(index)) {
        index = index - 1;
      }
    }

    const newAnswer: MultipleChoiceInput = {
      id: index,
      name: `answ${Math.abs(index)}` as MultipleChoiceInput["name"],
      placeholder: "Respuesta",
      type: "text",
    };

    setAnswers([...answers, newAnswer]);
  };

  return (
    <Form {...form}>
      <form onSubmit={createQuestionSubmit}>
        <FormError message={error} />
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Escribe tu pregunta aquí" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <fieldset className="grid grid-cols-1 gap-4 mt-5">
          {answers.map((input) => (
            <FormField
              key={input.id}
              control={form.control}
              name={input.name}
              render={({ field }) => (
                <fieldset className="flex w-1/2 gap-2 items-center relative">
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder={input.placeholder}
                        type={input.type}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                  {answers.length > 1 && (
                    <Button
                      onClick={() => {
                        hiddenAnswer(input.id);
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
              )}
            />
          ))}
        </fieldset>
        <fieldset className="mt-5">
          {answers.length < MULTIPLE_CHOISE_LIMIT ? (
            <Button
              onClick={addAnswer}
              type="button"
              className="h-8 w-20 rounded-full bg-lightaccent-100 hover:bg-lightaccent-100/80"
            >
              <p>
                <Plus className="w-5 h-5 text-white font-bold" />
              </p>
            </Button>
          ) : (
            <p>No puedes agregar mas de {MULTIPLE_CHOISE_LIMIT} respuestas</p>
          )}
        </fieldset>
      </form>
    </Form>
  );
};

export default QuestionEditor;
