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
  label?: string;
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
  required?: boolean;
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
              : "flex items-center gap-2 flex-col lg:flex-row"
          }`}
        >
          {label && (
            <FormLabel
              className={`w-full text-xs sm:text-sm ${labelStyle} ${
                type === "checkbox" ? "w-61" : ""
              }`}
            >
              {label}
              {required && type !== "checkbox" && (
                <span className="text-red-500">*</span>
              )}
            </FormLabel>
          )}

          <FormControl>
            {type === "file" ? (
              <Input
                className="text-xs sm:text-sm"
                type="file"
                onChange={(e) => field.onChange(e.target.files?.[0])}
              />
            ) : type === "textarea" ? (
              <Textarea
                className={`${inputStyle} text-xs sm:text-sm`}
                placeholder={placeholder}
                {...field}
              />
            ) : type === "checkbox" ? (
              <Input
                type="checkbox"
                className={`w-4 h-4 text-xs sm:text-sm ${inputStyle}`}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            ) : type === "radio" ? (
              <div className="flex justify-start gap-10 w-full">
                {options.map((option) => (
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Input
                      type="radio"
                      value={option.value}
                      checked={field.value === option.value}
                      onChange={() => field.onChange(option.value)}
                      className="w-4 h-4 text-xs sm:text-sm"
                    />
                    <span className="text-sm">{option.label}</span>
                  </div>
                ))}
              </div>
            ) : (
              <Input
                className={`${inputStyle} text-xs md:text-sm`}
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
