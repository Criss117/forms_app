"use client";

import { useSession } from "next-auth/react";
import { z } from "zod";

import { CreateQuestionSchemaClient } from "@/actions/question/schema";
import { useCommonForm } from "@/hooks";

const useQuestionEditor = () => {
  const { data } = useSession();

  const commonFormConfig = {
    schema: CreateQuestionSchemaClient,
    defaultValues: {
      subtypeId: 0,
      question: "",
      formId: "",
      required: true,
      answ1: "",
      answ2: "",
      answ3: "",
      answ4: "",
      answ5: "",
    },
  };

  const { error, isPending, form, setErrorHandler, startTransition } =
    useCommonForm<typeof CreateQuestionSchemaClient>(commonFormConfig);

  const createQuestionSubmit = form.handleSubmit(
    (values: z.infer<typeof CreateQuestionSchemaClient>) => {
      setErrorHandler("");

      console.log(values);
    }
  );

  return {
    form,
    error,
    isPending,
    createQuestionSubmit,
  };
};

export default useQuestionEditor;
