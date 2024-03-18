import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { verifyResponse } from "@/lib";
import { PUBLIC_ROUTES } from "@/lib/constants";
import { LoginSchema } from "@/actions/auth/schema";
import { login } from "@/actions/auth";

const useLogin = () => {
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

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((values: z.infer<typeof LoginSchema>) => {
    setErrorHandler("");

    startTransition(async () => {
      await login(values).then((response) => {
        if (!response.ok) {
          setErrorHandler("Credenciales inválidas o la cuenta no existe");
          return;
        }

        // const state = verifyResponse(response);
        // if (!state?.success) {
        //   setErrorHandler(state?.error || "");
        //   return;
        // }
        // push(PUBLIC_ROUTES.ACCOUNT_CREATED);
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
