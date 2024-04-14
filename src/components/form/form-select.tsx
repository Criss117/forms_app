import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { cn } from "@/lib";

type select = {
  name: string;
  value: string;
};

interface Props {
  disabled?: boolean;
  name: string;
  form: any;
  placeholder: string;
  label: string;
  selects: select[];
}

const FormSelect = ({
  name,
  form,
  selects,
  label,
  placeholder,
  disabled = false,
}: Props) => {
  if (disabled) {
    return null;
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(disabled && "hidden")}>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {selects.map(({ name, value }) => (
                <SelectItem key={value} value={value}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className="bg-destructive/20 border-l-4 border-destructive" />
        </FormItem>
      )}
    />
  );
};

export default FormSelect;
