"use client";
import { useCommonForm } from "@/hooks";
import { FindUsersClientSchema } from "@/actions/user";
import { useMembersReducer } from "@/hooks/reducers";

const useMemberActions = () => {
  const commonFormConfig = {
    schema: FindUsersClientSchema,
    defaultValues: {
      query: "",
    },
  };

  const { error, isPending, form, setErrorHandler, push, startTransition } =
    useCommonForm<typeof FindUsersClientSchema>(commonFormConfig);

  const { findUsersHandler } = useMembersReducer();

  return {
    error,
    form,
    isPending,
    setErrorHandler,
    findUsersHandler,
  };
};

export default useMemberActions;
