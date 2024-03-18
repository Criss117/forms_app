"use client";
import { useEffect, useState, useTransition } from "react";

import { confirmAccount } from "@/actions/user";
import { verifyResponse } from "@/lib";

import { Confirmed, ErrorConfirm, WaitConfirm } from "../../_components";

interface Props {
  params: {
    token: string;
  };
}

const ConfirmPage = ({ params }: Props) => {
  const { token } = params;
  const [success, setSuccess] = useState<boolean | undefined>();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      confirmAccount({ token }).then(({ response }) => {
        const state = verifyResponse(response);
        if (!state?.success) {
          setSuccess(false);
          return;
        }
        setSuccess(state?.success);
        return;
      });
    });
  }, [token]);

  return (
    <>
      {isPending ? <WaitConfirm /> : success ? <Confirmed /> : <ErrorConfirm />}
    </>
  );
};

export default ConfirmPage;
