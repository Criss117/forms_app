import { BaseSyntheticEvent } from "react";

import { Button, Form, FormField, Spinner } from "../ui";
import FormError from "./form-error";
import FormItemRender from "./form-item-render";
import { cn } from "@/lib";

interface Props {
  form: any;
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  error: string | undefined;
  inputs: Array<Record<string, any>>;
  isPending: boolean;
  submitLabel: string;
  fieldsetClass?: string;
  children?: React.ReactNode;
}

const FormRender = ({
  form,
  onSubmit,
  error,
  inputs,
  isPending,
  submitLabel,
  fieldsetClass,
  children,
}: Props) => {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <FormError message={error} />
        <fieldset className={cn("grid grid-cols-1 gap-2", fieldsetClass)}>
          {inputs.map(({ label, placeholder, type, name, hidden }, index) => (
            <FormField
              key={index}
              control={form.control}
              name={name as string}
              render={({ field }) => (
                <FormItemRender
                  field={field}
                  label={label}
                  disabled={isPending}
                  placeholder={placeholder}
                  type={type}
                  hidden={hidden}
                />
              )}
            />
          ))}
        </fieldset>
        <fieldset>{children}</fieldset>
        <Button
          disabled={isPending}
          type="submit"
          className="w-full mt-5 bg-lightprimary-200 hover:bg-lightprimary-200/80"
        >
          {isPending ? <Spinner /> : <span>{submitLabel}</span>}
        </Button>
      </form>
    </Form>
  );
};

export default FormRender;
