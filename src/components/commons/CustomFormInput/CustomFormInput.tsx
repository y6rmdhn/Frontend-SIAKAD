import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type FormFieldInputProps = {
  form: any;
  name: string;
  label: string;
  type?: "text" | "date" | "file";
  placeholder?: string;
  labelStyle?: string;
  required: boolean;
};

export const FormFieldInput = ({
  form,
  name,
  label,
  type = "text",
  placeholder,
  labelStyle,
  required,
}: FormFieldInputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex">
          <FormLabel className={`w-full ${labelStyle}`}>
            {label}
            {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            {type === "file" ? (
              <Input
                type="file"
                onChange={(e) => field.onChange(e.target.files?.[0])}
              />
            ) : (
              <Input {...field} type={type} placeholder={placeholder} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
