import {
  FormControl,
  FormDescription,
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
  type?:
    | "text"
    | "date"
    | "file"
    | "textarea"
    | "number"
    | "checkbox"
    | "password";
  placeholder?: string;
  labelStyle?: string;
  inputStyle?: string;
  position?: boolean;
  infoFile?: boolean;
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
  infoFile,
  position,
  required,
}: FormFieldInputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={`${
            position
              ? "flex flex-col justify-center gap-2"
              : "flex items-center gap-2"
          }`}
        >
          <FormLabel
            className={`w-full ${labelStyle} ${
              type === "checkbox" ? "w-61" : ""
            }`}
          >
            {label}
            {required && type !== "checkbox" && (
              <span className="text-red-500">*</span>
            )}
          </FormLabel>
          <FormControl>
            {type === "file" ? (
              <div className="w-full">
                <Input
                  type="file"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
                <span className="text-[#3F6FA9] text-xs">
                  jpg.jpg.pdf(maxsize 2.007152 MB)
                </span>
              </div>
            ) : type === "textarea" ? (
              <Textarea
                className={inputStyle}
                placeholder={placeholder}
                {...field}
              />
            ) : type === "checkbox" ? (
              <Input
                type="checkbox"
                className={`w-4 h-4 ${inputStyle}`}
                checked={field.value}
                onCheckedChange={field.onChange}
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
