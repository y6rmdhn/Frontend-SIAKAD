import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FormFieldInputProps = {
  form: any;
  name: string;
  label: string;
  type?: "text" | "date" | "file" | "textarea" | "number";
  placeholder?: string;
  labelStyle?: string;
  inputStyle?: string;
  required: boolean;
};

export const FormFieldInput = ({
  form,
  name,
  label,
  type = "text",
  placeholder,
  labelStyle,
  inputStyle,
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
            ) : type === "textarea" ? (
              <Textarea
                className={inputStyle}
                placeholder={placeholder}
                {...field}
              />
            ) : (
              <Input
                className={inputStyle}
                {...field}
                type={type}
                placeholder={placeholder}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
