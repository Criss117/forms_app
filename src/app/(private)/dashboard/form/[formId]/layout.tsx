"use client";

import { findFormById } from "@/actions/form";
import { useCurrentSession } from "@/hooks";
import { verifyResponse } from "@/lib";
import { useFormStore } from "@/zustand";
import { signOut } from "next-auth/react";
import { PropsWithChildren, useEffect } from "react";

interface Props extends PropsWithChildren {
  params: { formId: string };
}

const FormEditorLayout = ({ children, params }: Props) => {
  const { data, loading } = useCurrentSession();
  const { setForm, handleLoading } = useFormStore();
  const { formId } = params;

  useEffect(() => {
    handleLoading(true);
    if (loading) {
      return;
    }

    if (data === null || formId === undefined) {
      signOut();
      return;
    }

    findFormById({ jwtoken: data.user.jwt, formId })
      .then(({ response }) => {
        const res = verifyResponse(response);
        if (res?.statusCode === 404) {
          signOut();
          return;
        }

        if (res?.success && response?.data) {
          console.log({ form: response.data });
          setForm(response.data);
        }
      })
      .finally(() => {
        handleLoading(false);
      });
  }, [loading, data, formId]);

  return <>{children}</>;
};

export default FormEditorLayout;
