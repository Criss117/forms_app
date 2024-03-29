import { z } from "zod";

import { createUser } from "@/actions/user/actions";
import { CreateUserSchema } from "@/actions/user";
import { verifyResponse } from "@/lib";
import { PUBLIC_ROUTES } from "@/lib/constants";
import { useCommonForm } from ".";

const useRegister = () => {
  const commonFormConfig = {
    schema: CreateUserSchema,
    defaultValues: {
      email: "",
      password: "",
      password_confirm: "",
      name: "",
      surname: "",
      phone: "",
    },
  };

  const { error, isPending, form, setErrorHandler, push, startTransition } =
    useCommonForm<typeof CreateUserSchema>(commonFormConfig);

  const onSubmit = form.handleSubmit(
    (values: z.infer<typeof CreateUserSchema>) => {
      const { password, password_confirm } = values;
      if (password !== password_confirm) {
        setErrorHandler("Las contraseñas no coinciden", 6000);
        return;
      }

      setErrorHandler("");

      startTransition(async () => {
        await createUser(values).then(({ response }) => {
          const state = verifyResponse(response);
          if (!state?.success) {
            setErrorHandler(state?.error || "");
            return;
          }
          push(PUBLIC_ROUTES.ACCOUNT_CREATED);
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

export default useRegister;
