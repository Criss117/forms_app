"use client";

import { useSession } from "next-auth/react";
import { z } from "zod";

import { CreateQuestionSchemaClient } from "@/actions/question/schema";
import { useCommonForm } from "@/hooks";
import { useFieldArray } from "react-hook-form";
import { FORM_MESSAGE } from "@/lib/constants";
import { createQuestion } from "@/actions/question/action";
import { verifyResponse } from "@/lib";

const useQuestionEditor = () => {
  const { data } = useSession();

  const commonFormConfig = {
    schema: CreateQuestionSchemaClient,
    defaultValues: {
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

      console.log({
        question: rest,
        jwtoken: data?.user.jwt,
        answers,
      });

      startTransition(async () => {
        if (!data?.user.jwt) return;

        await createQuestion({
          question: rest,
          jwtoken: data?.user.jwt,
          answers,
        }).then(({ response }) => {
          const state = verifyResponse(response);

          console.log({ response });
        });
        form.reset();
      });
    }
  );

  return {
    form,
    error,
    isPending,
    fields,
    append,
    remove,
    createQuestionSubmit,
  };
};

export default useQuestionEditor;
