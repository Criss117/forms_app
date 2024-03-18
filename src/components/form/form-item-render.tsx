import { HTMLInputTypeAttribute } from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";

interface Props {
  label: string;
  disabled: boolean;
  placeholder: string;
  field: any;
  type: HTMLInputTypeAttribute | undefined;
}

const FormItemRender = ({
  label,
  disabled,
  placeholder,
  field,
  type,
}: Props) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          {...field}
          disabled={disabled}
          placeholder={placeholder}
          type={type}
        />
      </FormControl>
      <FormMessage className="bg-destructive/20 border-l-4 border-destructive" />
    </FormItem>
  );
};

export default FormItemRender;
