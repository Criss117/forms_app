"use client";
import { z } from "zod";

import { signOut } from "next-auth/react";

import { CreateFolderSchemaClient } from "@/actions/folder/schema";
import { createFolder, findFolder, findFoldersAction } from "@/actions/folder";
import { useFolderStore } from "@/zustand";
import { verifyResponse } from "@/lib";

import { useApiPetition, useCommonForm } from "..";

const commonFormConfig = {
  schema: CreateFolderSchemaClient,
  defaultValues: {
    name: "",
  },
};

const useFolderActions = () => {
  const { jwt, isPending, ready, handlePetition } = useApiPetition();
  const { setFolder } = useFolderStore();

  const { error, form, setErrorHandler, startTransition } =
    useCommonForm<typeof CreateFolderSchemaClient>(commonFormConfig);

  const findOneFolder = async (folderId: string) => {
    if (!ready) return;

    setErrorHandler("");
    handlePetition("init");

    const form = await findFolder({ folderId, jwtoken: jwt })
      .then(({ response }) => {
        const state = verifyResponse(response);

        if (state?.statusCode === 404) {
          signOut();
          return;
        }

        if (state?.success && response?.data) {
          return response.data;
        }
      })
      .finally(() => {
        handlePetition("finished");
      });

    return form;
  };

  const findAllFolders = async () => {
    setErrorHandler("");
    handlePetition("init");

    const folders = await findFoldersAction({ jwtoken: jwt })
      .then(({ response }) => {
        const state = verifyResponse(response);
        if (state?.statusCode === 404) {
          signOut();
          return;
        }

        if (state?.success && response?.data) {
          return response.data;
        }
      })
      .finally(() => {
        handlePetition("finished");
      });

    return folders;
  };

  const createFolderSubmit = form.handleSubmit(
    async (values: z.infer<typeof CreateFolderSchemaClient>) => {
      const { name } = values;

      if (!ready) return;

      setErrorHandler("");
      handlePetition("init");

      await createFolder({ name, jwtoken: jwt }).then(({ response }) => {
        const state = verifyResponse(response);
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
      });

      handlePetition("finished");
    }
  );

  return {
    form,
    error,
    isPending,
    findOneFolder,
    findAllFolders,
    setErrorHandler,
    createFolderSubmit,
  };
};

export default useFolderActions;
