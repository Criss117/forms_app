import { z } from "zod";

import { signOut, useSession } from "next-auth/react";

import { CreateFolderSchemaClient } from "@/actions/folder/schema";
import { createFolder, findFolders } from "@/actions/folder";
import { useFolderStore } from "@/zustand";
import { verifyResponse } from "@/lib";

import { useCommonForm } from "..";

const commonFormConfig = {
  schema: CreateFolderSchemaClient,
  defaultValues: {
    name: "",
  },
};

const useFolderActions = () => {
  const { data } = useSession();
  const { setFolder, setFolders } = useFolderStore();

  const { error, isPending, form, setErrorHandler, startTransition } =
    useCommonForm<typeof CreateFolderSchemaClient>(commonFormConfig);

  const findAllFolders = () => {
    if (!data?.user.jwt) return;
    startTransition(async () => {
      const foldersLC = localStorage.getItem("folders");

      if (foldersLC) {
        console.log({ foldersLC });
        return;
      }

      await findFolders({ jwtoken: data?.user?.jwt }).then(({ response }) => {
        const state = verifyResponse(response);
        if (state?.statusCode === 404) {
          signOut();
          return;
        }
        if (state?.success && response?.data) {
          setFolders(response?.data);
          localStorage.setItem("folders", JSON.stringify(response?.data));
        }
      });
    });
  };

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

  return {
    form,
    error,
    isPending,
    findAllFolders,
    setErrorHandler,
    createFolderSubmit,
  };
};

export default useFolderActions;
