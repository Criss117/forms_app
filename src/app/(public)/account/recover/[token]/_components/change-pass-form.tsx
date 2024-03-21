"use client";

import { FormRender } from "@/components/form";
import { useChangePass } from "@/hooks";
import { FORM_INPUTS } from "@/lib/constants";

interface Props {
  token: string;
}

const ChangePassForm = ({ token }: Props) => {
  const { error, form, isPending, onSubmit } = useChangePass({ token });

  const { CHANGE_PASS_INPUTS } = FORM_INPUTS;

  return (
    <>
      <FormRender
        error={error}
        form={form}
        inputs={CHANGE_PASS_INPUTS}
        isPending={isPending}
        onSubmit={onSubmit}
        submitLabel="Cambiar contraseña"
        fieldsetClass="md:grid-cols-2"
      />
    </>
  );
};

export default ChangePassForm;
