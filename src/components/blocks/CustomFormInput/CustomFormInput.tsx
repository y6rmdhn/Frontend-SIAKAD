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
  required?: boolean;
  options?: { label: string; value: string }[];
  readOnly?: boolean;
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
  readOnly = false,
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
              : "flex items-start gap-y-5 flex-col lg:flex-row"
          }`}
        >
          {label && (
            <FormLabel
              className={`w-full text-xs sm:text-sm mt-0 lg:mt-2 ${labelStyle} ${
                type === "checkbox" ? "w-61" : ""
              }`}
            >
              {label}
              {required && type !== "checkbox" && (
                <span className="text-red-500">*</span>
              )}
            </FormLabel>
          )}

          <div className="w-full flex flex-col gap-1">
            <FormControl>
              {type === "file" ? (
                <Input
                  className="text-xs sm:text-sm"
                  type="file"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                  disabled={readOnly}
                />
              ) : type === "textarea" ? (
                <Textarea
                  className={`${inputStyle} text-xs sm:text-sm`}
                  placeholder={placeholder}
                  {...field}
                  readOnly={readOnly}
                />
              ) : type === "checkbox" ? (
                <Input
                  type="checkbox"
                  className={`w-4 h-4 text-xs sm:text-sm ${inputStyle}`}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  disabled={readOnly}
                />
              ) : type === "radio" ? (
                <div className="flex justify-start gap-10 w-full pt-2">
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-xs sm:text-sm"
                    >
                      <Input
                        type="radio"
                        value={option.value}
                        checked={field.value === option.value}
                        onChange={() => field.onChange(option.value)}
                        className="w-4 h-4 text-xs sm:text-sm"
                        disabled={readOnly}
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
                  readOnly={readOnly}
                />
              )}
            </FormControl>

            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};
