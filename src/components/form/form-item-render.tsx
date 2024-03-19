import { HTMLInputTypeAttribute } from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";
import { cn } from "@/lib";

interface Props {
  label: string;
  disabled: boolean;
  placeholder: string;
  field: any;
  type: HTMLInputTypeAttribute | undefined;
  hidden?: boolean;
}

const FormItemRender = ({
  label,
  disabled,
  placeholder,
  field,
  type,
  hidden,
}: Props) => {
  return (
    <FormItem className={cn(hidden && "hidden")}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          {...field}
          disabled={disabled || hidden}
          placeholder={placeholder}
          type={type}
        />
      </FormControl>
      <FormMessage className="bg-destructive/20 border-l-4 border-destructive" />
    </FormItem>
  );
};

export default FormItemRender;
