import { z } from "zod";

import { signOut, useSession } from "next-auth/react";
import { CreateFolderSchemaClient } from "@/actions/folder/schema";
import { createFolder } from "@/actions/folder";
import { useCommonForm } from ".";
import { verifyResponse } from "@/lib";
import { useFolderStore } from "@/zustand";

const commonFormConfig = {
  schema: CreateFolderSchemaClient,
  defaultValues: {
    name: "",
  },
};

const useFolderActions = () => {
  const { data } = useSession();
  const { setFolder } = useFolderStore();

  const { error, isPending, form, setErrorHandler, push, startTransition } =
    useCommonForm<typeof CreateFolderSchemaClient>(commonFormConfig);

  const createFolderSubmit = form.handleSubmit(
    (values: z.infer<typeof CreateFolderSchemaClient>) => {
      const { name } = values;

      if (data?.user.jwt === undefined) {
        signOut();
        return;
      }

      setErrorHandler("");
      startTransition(async () => {
        await createFolder({ name, jwtoken: data?.user?.jwt }).then(
          ({ response }) => {
            const state = verifyResponse(response);
            console.log({ state, response });
            if (state?.statusCode === 404) {
              signOut();
              return;
            }
            if (state?.success) {
              console.log({ response, state });
              setFolder(response?.data);
            }
            if (!state?.success) {
              setErrorHandler(state?.error || "", 6000);
            }
          }
        );
      });
    }
  );

  return { isPending, form, error, createFolderSubmit, setErrorHandler };
};

export default useFolderActions;
