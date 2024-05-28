"use client";

import { useCurrentSession, useFormActions } from "@/hooks";
import { PropsWithChildren, useEffect } from "react";

interface Props extends PropsWithChildren {
  params: { formId: string };
}

const FormEditorLayout = ({ children, params }: Props) => {
  const { findForm } = useFormActions();
  const { data } = useCurrentSession();
  const { formId } = params;

  useEffect(() => {
    findForm(formId);
  }, [data, formId]);

  return <>{children}</>;
};

export default FormEditorLayout;
