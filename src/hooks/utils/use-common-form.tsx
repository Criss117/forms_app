import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { DefaultValues, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface Props<T extends z.ZodObject<any>> {
  schema: any;
  defaultValues: DefaultValues<z.TypeOf<T>> | undefined;
}

function useCommonForm<T extends z.ZodObject<any>>({
  schema,
  defaultValues,
}: Props<T>) {
  const { push } = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const setErrorHandler = (message: string, ms: number = 5000) => {
    if (message.length === 0) return;
    setError(message);
    setTimeout(() => {
      setError("");
    }, ms);
  };

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return {
    form,
    error,
    isPending,
    push,
    setErrorHandler,
    startTransition,
  };
}

export default useCommonForm;
