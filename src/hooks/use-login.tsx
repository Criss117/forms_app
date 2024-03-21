import { z } from "zod";

import { PRIVATE_ROUTES } from "@/lib/constants";
import { LoginSchema } from "@/actions/auth/schema";
import { login } from "@/actions/auth";
import { useCommonForm } from ".";

const useLogin = () => {
  const commonFormConfig = {
    schema: LoginSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  };

  const { error, form, isPending, push, setErrorHandler, startTransition } =
    useCommonForm<typeof LoginSchema>(commonFormConfig);

  const onSubmit = form.handleSubmit((values: z.infer<typeof LoginSchema>) => {
    setErrorHandler("");

    startTransition(async () => {
      await login(values).then((response) => {
        if (!response.ok) {
          setErrorHandler("Credenciales inválidas o la cuenta no existe");
          return;
        }

        if (response.ok) {
          push(PRIVATE_ROUTES.DASHBOARD_HOME);
        }
      });
    });
  });

  return {
    error,
    isPending,
    form,
    setErrorHandler,
    onSubmit,
  };
};

export default useLogin;
