"use client";

import { FormRender } from "@/components/form";
import { useLogin } from "@/hooks";
import { FORM_INPUTS } from "@/lib/constants";
const LoginForm = () => {
  const { error, form, isPending, onSubmit } = useLogin();
  const { LOGIN_FORM_INPUTS } = FORM_INPUTS;

  return (
    <FormRender
      form={form}
      error={error}
      inputs={LOGIN_FORM_INPUTS}
      isPending={isPending}
      onSubmit={onSubmit}
      submitLabel="Ingresar"
    />
  );
};

export default LoginForm;
