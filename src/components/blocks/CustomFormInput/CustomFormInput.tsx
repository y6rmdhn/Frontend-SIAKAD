import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    | "password"
    | "radio";
  placeholder?: string;
  labelStyle?: string;
  inputStyle?: string;
  position?: boolean;
  infoFile?: boolean;
  required: boolean;
  options?: { label: string; value: string }[]; // hanya untuk radio
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
  options = [],
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
            ) : type === "checkbox" ? (
              <Input
                type="checkbox"
                className={`w-4 h-4 ${inputStyle}`}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            ) : type === "radio" ? (
              <div className="flex justify-start gap-10 w-full">
                {options.map((option) => (
                  <div className="flex items-center gap-2">
                    <Input
                      type="radio"
                      value={option.value}
                      checked={field.value === option.value}
                      onChange={() => field.onChange(option.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{option.label}</span>
                  </div>
                ))}
              </div>
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
