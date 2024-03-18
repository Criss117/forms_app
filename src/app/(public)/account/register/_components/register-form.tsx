"use client";

import { Button, Form, FormField, Spinner } from "@/components/ui";
import { FormError, FormItemRender, FormRender } from "@/components/form";
import { FORM_INPUTS } from "@/lib/constants";
import { useRegister } from "@/hooks";

const RegisterForm = () => {
  const { error, form, isPending, onSubmit } = useRegister();
  const { REGISTER_FORM_INPUTS } = FORM_INPUTS;

  return (
    <FormRender
      error={error}
      form={form}
      inputs={REGISTER_FORM_INPUTS}
      isPending={isPending}
      onSubmit={onSubmit}
      submitLabel="Registrarse"
      fieldsetClass="md:grid-cols-2"
    />
  );
};

export default RegisterForm;
