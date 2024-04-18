import { ChangeEvent, HTMLInputTypeAttribute } from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";
import { cn } from "@/lib";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

interface Props {
  label: string;
  disabled: boolean;
  placeholder: string;
  field: ControllerRenderProps<FieldValues, string>;
  type: HTMLInputTypeAttribute | undefined;
  hidden?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormItemRender = ({
  label,
  disabled,
  placeholder,
  field,
  type,
  hidden,
  onChange,
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
          onChange={(e) => {
            field.onChange(e.target.value);
            onChange && onChange(e);
          }}
          autoFocus
        />
      </FormControl>
      <FormMessage className="bg-destructive/20 border-l-4 border-destructive" />
    </FormItem>
  );
};

export default FormItemRender;
