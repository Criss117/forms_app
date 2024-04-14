"use client";

import { z } from "zod";
import { signOut, useSession } from "next-auth/react";

import { createForm } from "@/actions/form";
import { CreateFormSchemaClient } from "@/actions/form/schema";
import { useCommonForm } from ".";
import { verifyResponse } from "@/lib";
import { PRIVATE_ROUTES } from "@/lib/constants";

const useFormActions = () => {
  const { data } = useSession();

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
        signOut();
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
          console.log("response", response);
          // if (state?.success) {
          //   push(PRIVATE_ROUTES.FORM_HOME + "/" + response?.data?.formId);
          // }
        });
      });
    }
  );

  return { error, form, isPending, createFormSubmit, setErrorHandler };
};

export default useFormActions;
