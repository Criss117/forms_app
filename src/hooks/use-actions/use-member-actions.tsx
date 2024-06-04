"use client";
import { z } from "zod";
import { signOut, useSession } from "next-auth/react";

import { verifyResponse } from "@/lib";
import { useCommonForm, useFolderActions } from "@/hooks";
import { useToast } from "@/components/ui";
import { USER_PERMISSIONS } from "@/lib/constants";
import { addFolderMembers, deleteFolderMember } from "@/actions/folder";
import { useMembersReducer } from "@/hooks/reducers";
import { addFolderMembersClientSchema } from "@/actions/folder/schema";
import { useFolderStore } from "@/zustand";

const commonFormConfig = {
  schema: addFolderMembersClientSchema,
  defaultValues: {
    userId: 0,
    folderId: "",
    permission: USER_PERMISSIONS.READ,
  },
};

const useMemberActions = () => {
  const { toast } = useToast();
  const { data } = useSession();
  const { findOneFolder } = useFolderActions();
  const { currentFolder, setCurrentFolder } = useFolderStore();

  const { error, isPending, form, setErrorHandler, push, startTransition } =
    useCommonForm<typeof addFolderMembersClientSchema>(commonFormConfig);

  const { members, isSearching, findUsersHandler, clearState } =
    useMembersReducer();

  const deleteMember = (id: number) => {
    if (data?.user.jwt === undefined) {
      return;
    }

    startTransition(async () => {
      await deleteFolderMember({
        memberId: id,
        jwtoken: data?.user?.jwt,
        folderId: currentFolder?.id || "",
      }).then(({ response }) => {
        console.log({ response });

        const state = verifyResponse(response);
        if (state?.statusCode === 404) {
          signOut();
          return;
        }
        if (!state?.success) {
          toast({
            title: "Error",
            description: response?.message || "No se pudo eliminar el usuario",
          });
        }
        if (state?.success) {
          toast({
            title: "Éxito",
            description: "Se elimino el usuario correctamente",
          });
          findOneFolder(currentFolder?.id || "").then((folder) => {
            if (folder) {
              setCurrentFolder(folder);
            }
          });
        }
      });
    });
  };

  const onSubmit = form.handleSubmit(
    (values: z.infer<typeof addFolderMembersClientSchema>) => {
      if (data?.user.jwt === undefined) {
        return;
      }

      setErrorHandler("");
      startTransition(async () => {
        await addFolderMembers({ ...values, jwtoken: data?.user?.jwt })
          .then(({ response }) => {
            const state = verifyResponse(response);
            if (state?.statusCode === 404) {
              signOut();
              return;
            }
            if (!state?.success) {
              toast({
                title: "Error",
                description:
                  response?.message || "No se pudo agregar el usuario",
                variant: "destructive",
                duration: 3000,
              });
            }
            if (state?.success) {
              toast({
                title: "Éxito",
                description: "Se agrego el usuario correctamente",
                duration: 3000,
              });
              findOneFolder(currentFolder?.id || "").then((folder) => {
                if (folder) {
                  setCurrentFolder(folder);
                }
              });
            }
          })
          .catch(() => {
            toast({
              title: "Error",
              description: "No se pudo agregar el usuario",
              variant: "destructive",
              duration: 3000,
            });
          });
      });
    }
  );

  return {
    form,
    error,
    members,
    isPending,
    isSearching,
    onSubmit,
    clearState,
    setErrorHandler,
    findUsersHandler,
    deleteMember,
  };
};

export default useMemberActions;
