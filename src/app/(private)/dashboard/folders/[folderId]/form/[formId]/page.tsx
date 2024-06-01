"use client";

import { useFolderStore, useFormStore } from "@/zustand";
import { useEffect } from "react";
import { useApiPetition, useFormActions } from "@/hooks";
import { FormInfo, FormSkeleton } from "./_components/form-view";

interface Props {
  params: { formId: string; folderId: string };
}

const FormPage = ({ params }: Props) => {
  const { ready } = useApiPetition();
  const { setForm } = useFormStore();
  const { isPending, findForm } = useFormActions();

  useEffect(() => {
    if (!ready) return;
    findForm(params.formId, params.folderId).then((form) => {
      setForm(form);
    });
  }, [params, ready]);

  return <>{isPending ? <FormSkeleton /> : <FormInfo />}</>;
};

export default FormPage;
