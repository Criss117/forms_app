import { changePass, ChangePassSchema } from "@/actions/user";
import useCommonForm from "./use-common-form";
import { verifyResponse } from "@/lib";
import { PUBLIC_ROUTES } from "@/lib/constants";
import { z } from "zod";
import { useState } from "react";

interface Props {
  token: string;
}

const useChangePass = ({ token }: Props) => {
  const commonFormConfig = {
    schema: ChangePassSchema,
    defaultValues: {
      password: "",
      password_confirm: "",
      token,
    },
  };

  const { error, form, isPending, push, setErrorHandler, startTransition } =
    useCommonForm<typeof ChangePassSchema>(commonFormConfig);

  const onSubmit = form.handleSubmit(
    (values: z.infer<typeof ChangePassSchema>) => {
      const { password, password_confirm } = values;
      if (password !== password_confirm) {
        setErrorHandler("Las contraseñas no coinciden", 6000);
        return;
      }

      setErrorHandler("");

      startTransition(async () => {
        await changePass(values).then(({ response }) => {
          const state = verifyResponse(response);
          console.log({ response });
          if (!state?.success) {
            setErrorHandler(state?.error || "", 6000);
            return;
          }
          push(PUBLIC_ROUTES.PASSWORD_CHANGED);
        });
      });
    }
  );

  return {
    error,
    isPending,
    form,
    setErrorHandler,
    onSubmit,
  };
};

export default useChangePass;
