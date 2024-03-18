import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { createUser } from "@/actions/user/actions";
import { CreateUserSchema } from "@/actions/user";
import { verifyResponse } from "@/lib";
import { PUBLIC_ROUTES } from "@/lib/constants";

const useRegister = () => {
  const { push } = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const setErrorHandler = (message: string, ms: number = 3000) => {
    if (message.length === 0) return;
    setError(message);
    setTimeout(() => {
      setError("");
    }, ms);
  };

  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      email: "",
      password: "",
      password_confirm: "",
      name: "",
      surname: "",
      phone: "",
    },
  });

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
