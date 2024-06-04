"use client";

import { useFolderStore, useFormStore, useRecentStore } from "@/zustand";
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
  const { addRecent } = useRecentStore();

  useEffect(() => {
    if (!ready) return;
    findForm(params.formId, params.folderId).then((form) => {
      setForm(form);
      addRecent({
        url: `/dashboard/folders/${params.folderId}/form/${params.formId}`,
        type: "form",
        name: form?.name || "FormName",
      });
    });
  }, [params, ready]);

  return <>{isPending ? <FormSkeleton /> : <FormInfo />}</>;
};

export default FormPage;
