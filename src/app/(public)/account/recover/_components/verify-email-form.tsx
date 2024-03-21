"use client";

import { FormRender } from "@/components/form";
import { useVerifyEmail } from "@/hooks";
import { FORM_INPUTS } from "@/lib/constants";

const VerifyEmailForm = () => {
  const { error, form, isPending, onSubmit, setErrorHandler } =
    useVerifyEmail();

  const { VERIFY_EMAIL_INPUTS } = FORM_INPUTS;

  return (
    <FormRender
      error={error}
      form={form}
      inputs={VERIFY_EMAIL_INPUTS}
      isPending={isPending}
      onSubmit={onSubmit}
      submitLabel="Verificar Correo"
    />
  );
};

export default VerifyEmailForm;
