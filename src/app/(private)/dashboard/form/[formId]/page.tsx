"use client";

import { useFormStore } from "@/zustand";
import { useEffect } from "react";
import { useApiPetition, useFormActions } from "@/hooks";
import { FormInfo, FormSkeleton } from "./_components/form-view";

interface Props {
  params: { formId: string };
}

const FormPage = ({ params }: Props) => {
  const { ready } = useApiPetition();
  const { form, setForm } = useFormStore();
  const { isPending, findForm } = useFormActions();

  useEffect(() => {
    if (!ready) return;
    findForm(params.formId).then((form) => {
      setForm(form);
    });
  }, [params, ready]);

  return <>{isPending ? <FormSkeleton /> : <FormInfo form={form} />}</>;
};

export default FormPage;
