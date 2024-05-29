"use client";

import { z } from "zod";
import { signOut } from "next-auth/react";

import { CreateFormSchemaClient } from "@/actions/form/schema";
import { createForm, findFormById } from "@/actions/form";
import { PRIVATE_ROUTES } from "@/lib/constants";
import { useFormStore } from "@/zustand";
import { verifyResponse } from "@/lib";

import { useApiPetition, useCommonForm } from "..";

const commonFormConfig = {
  schema: CreateFormSchemaClient,
  defaultValues: {
    name: "",
    description: "",
    folderId: "",
  },
};

const useFormActions = () => {
  const { jwt, isPending, ready, handlePetition } = useApiPetition();
  const { setForm } = useFormStore();

  const { error, form, setErrorHandler, push, startTransition } =
    useCommonForm<typeof CreateFormSchemaClient>(commonFormConfig);

  const createFormSubmit = form.handleSubmit(
    (values: z.infer<typeof CreateFormSchemaClient>) => {
      if (!ready) return;

      const newForm = {
        ...values,
        jwtoken: jwt,
      };

      setErrorHandler("");
      startTransition(async () => {
        await createForm(newForm).then(({ response }) => {
          const state = verifyResponse(response);
          if (state?.statusCode === 404) {
            signOut();
            return;
          }
          if (state?.success) {
            push(PRIVATE_ROUTES.FORM_HOME + "/" + response?.data?.formId);
          }
        });
      });
    }
  );

  const findForm = async (formId: string) => {
    if (!ready) return;

    handlePetition("init");
    const form = await findFormById({ jwtoken: jwt, formId })
      .then(({ response }) => {
        const res = verifyResponse(response);
        if (res?.statusCode === 404) {
          signOut();
          return;
        }

        if (res?.success && response?.data) {
          setForm(response.data);
          return response.data;
        }
      })
      .finally(() => {
        handlePetition("finished");
      });

    return form;
  };

  return {
    error,
    form,
    isPending,
    findForm,
    createFormSubmit,
    setErrorHandler,
  };
};

export default useFormActions;
