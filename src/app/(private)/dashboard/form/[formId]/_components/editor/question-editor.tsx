"use client";
import { Plus } from "lucide-react";

import { FormError } from "@/components/form";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  Textarea,
} from "@/components/ui";
import { MULTIPLE_CHOISE_LIMIT } from "@/lib/constants";
import { useQuestionEditor } from "@/hooks";

import { AnswersEditor, ItemsData } from ".";
import { useQuestionEditorStore } from "@/zustand";
import { useEffect } from "react";

const QuestionEditor = () => {
  const {
    error,
    form,
    isPending,
    fields,
    append,
    remove,
    createQuestionSubmit,
  } = useQuestionEditor();

  const { editing, questionEditing } = useQuestionEditorStore();

  useEffect(() => {
    if (editing) {
      form.reset(questionEditing);
    }
  }, [editing, questionEditing]);

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
          <AnswersEditor
            fields={fields}
            form={form}
            remove={remove}
            isPending={isPending}
          />
        </fieldset>
        <fieldset>
          <ItemsData form={form} />
        </fieldset>
        <fieldset className="mt-5">
          {fields.length < MULTIPLE_CHOISE_LIMIT ? (
            <Button
              onClick={() => {
                if (fields.length < MULTIPLE_CHOISE_LIMIT) {
                  append({
                    id: -Math.floor(Math.random() * 1000),
                    answer: "",
                  });
                }
              }}
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
        <Button type="submit" className="mt-5" variant="outline">
          Guardar
        </Button>
      </form>
    </Form>
  );
};

export default QuestionEditor;
