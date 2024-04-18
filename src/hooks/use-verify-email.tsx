import { z } from "zod";

import { EmailSchema, verifyEmail } from "@/actions/user";
import { PUBLIC_ROUTES } from "@/lib/constants";
import { verifyResponse } from "@/lib";

import useCommonForm from "./utils/use-common-form";

const useVerifyEmail = () => {
  const commonFormConfig = {
    schema: EmailSchema,
    defaultValues: {
      email: "",
    },
  };

  const { error, isPending, form, setErrorHandler, push, startTransition } =
    useCommonForm<typeof EmailSchema>(commonFormConfig);

  const onSubmit = form.handleSubmit((values: z.infer<typeof EmailSchema>) => {
    setErrorHandler("");

    startTransition(async () => {
      await verifyEmail(values).then(({ response }) => {
        const state = verifyResponse(response);
        if (!state?.success) {
          setErrorHandler(state?.error || "");
          return;
        }

        push(PUBLIC_ROUTES.FORGOT_PASSWORD_CONFIRM);
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

export default useVerifyEmail;
