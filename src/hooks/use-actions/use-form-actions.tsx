"use client";

import { z } from "zod";
import { signOut } from "next-auth/react";

import { createForm, findFormById } from "@/actions/form";
import { CreateFormSchemaClient } from "@/actions/form/schema";
import { verifyResponse } from "@/lib";
import { PRIVATE_ROUTES } from "@/lib/constants";

import { useCommonForm, useCurrentSession } from "..";
import { useFormStore } from "@/zustand";

const useFormActions = () => {
  const { data, loading } = useCurrentSession();
  const { setForm, handleLoading } = useFormStore();

  const commonFormConfig = {
    schema: CreateFormSchemaClient,
    defaultValues: {
      name: "",
      description: "",
      folderId: "",
    },
  };

  const { error, isPending, form, setErrorHandler, push, startTransition } =
    useCommonForm<typeof CreateFormSchemaClient>(commonFormConfig);

  const createFormSubmit = form.handleSubmit(
    (values: z.infer<typeof CreateFormSchemaClient>) => {
      if (data?.user.jwt === undefined) {
        return;
      }

      if (values.folderId === "") {
        setErrorHandler("Por favor, seleccione una carpeta", 6000);
        return;
      }

      const newForm = {
        ...values,
        jwtoken: data?.user.jwt,
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

  const findForm = (formId: string) => {
    handleLoading(true);
    if (loading) {
      return;
    }

    if (data === null || formId === undefined) {
      signOut();
      return;
    }

    findFormById({ jwtoken: data.user.jwt, formId })
      .then(({ response }) => {
        const res = verifyResponse(response);
        if (res?.statusCode === 404) {
          signOut();
          return;
        }

        if (res?.success && response?.data) {
          setForm(response.data);
        }
      })
      .finally(() => {
        handleLoading(false);
      });
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
