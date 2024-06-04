"use client";

import { useFieldArray } from "react-hook-form";
import { signOut, useSession } from "next-auth/react";
import { z } from "zod";

import { CreateQuestionSchemaClient } from "@/actions/question/schema";
import { useCommonForm, useFormActions } from "@/hooks";
import { FORM_MESSAGE } from "@/lib/constants";
import {
  createQuestion,
  deleteQuestion as deleteQuestionHandler,
} from "@/actions/question/action";
import { verifyResponse } from "@/lib";
import { useFormStore, useQuestionEditorStore } from "@/zustand";
import { useToast } from "@/components/ui";
import { Question } from "@/actions/form";

const commonFormConfig = {
  schema: CreateQuestionSchemaClient,
  defaultValues: {
    questionId: -1,
    subtypeId: 0,
    question: "",
    formId: "",
    required: true,
    answers: [
      {
        id: -1,
        answer: "",
      },
      {
        id: -2,
        answer: "",
      },
    ],
  },
};

const useQuestionEditor = () => {
  const { data } = useSession();
  const { toast } = useToast();
  const { setNewQuestion, removeQuestion } = useFormStore();
  const { editing, setIsOpenModal } = useQuestionEditorStore();

  const { error, isPending, form, setErrorHandler, startTransition } =
    useCommonForm<typeof CreateQuestionSchemaClient>(commonFormConfig);

  const { fields, append, remove } = useFieldArray({
    name: "answers",
    control: form.control,
    rules: {
      required: FORM_MESSAGE.ANSWER.REQUIRED,
    },
  });

  const createQuestionSubmit = form.handleSubmit(
    (values: z.infer<typeof CreateQuestionSchemaClient>) => {
      setErrorHandler("");

      const { answers, ...rest } = values;

      let errors = false;
      answers.forEach(({ answer }) => {
        if (answer === "") {
          setErrorHandler(FORM_MESSAGE.ANSWER.REQUIRED, 6000);
          errors = true;
          return;
        }
      });

      if (errors) {
        return;
      }

      startTransition(async () => {
        if (!data?.user.jwt) return;

        await createQuestion({
          question: rest,
          jwtoken: data?.user.jwt,
          answers,
          editing,
        }).then(({ response }) => {
          const state = verifyResponse(response);

          if (!state?.success && state?.statusCode === 404) {
            signOut();
            return;
          }

          if (!state?.success) {
            setIsOpenModal(false);
            toast({
              title: "Error",
              description: "Hubo un error al intentar crear la pregunta",
              duration: 5000,
              variant: "destructive",
            });
          }

          if (state?.success) {
            setIsOpenModal(false);
            toast({
              title: "Pregunta creada",
              description: "La pregunta se ha creado correctamente",
              duration: 5000,
            });
          }

          setNewQuestion(response?.data as Question);
        });
        form.reset();
      });
    }
  );

  const deleteQuestion = (questionId: number) => {
    if (!data?.user.jwt) return;

    startTransition(async () => {
      await deleteQuestionHandler({
        questionId,
        jwtoken: data?.user.jwt,
      }).then(({ response }) => {
        const state = verifyResponse(response);
        console.log({ response });
        if (state?.statusCode === 404) {
          signOut();
          return;
        }

        if (!state?.success) {
          setIsOpenModal(false);
          toast({
            title: "Error",
            description: "Hubo un error al intentar eliminar la pregunta",
            duration: 5000,
            variant: "destructive",
          });
        }

        if (state?.success) {
          setIsOpenModal(false);
          toast({
            title: "Pregunta eliminada",
            description: "La pregunta se ha eliminado correctamente",
            duration: 5000,
          });
        }

        removeQuestion(questionId);
      });
    });
  };

  return {
    form,
    error,
    isPending,
    fields,
    append,
    remove,
    createQuestionSubmit,
    deleteQuestion,
  };
};

export default useQuestionEditor;
