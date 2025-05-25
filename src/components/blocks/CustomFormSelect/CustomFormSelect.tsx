import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormFieldSelectProps = {
  form: any;
  name: string;
  label?: string;
  placeholder?: string;
  options: { label: string; value: string | number }[];
  labelStyle: string;
  disabled?: boolean;
  required: boolean;
  classname?: string;
};

export const FormFieldSelect = ({
  form,
  name,
  label,
  placeholder,
  options,
  disabled,
  labelStyle,
  required,
  classname,
}: FormFieldSelectProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col lg:flex-row">
          <FormLabel className={`w-full text-xs md:text-sm ${labelStyle}`}>
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <Select
            onValueChange={(value) => {
              if (!disabled) {
                // Cek apakah value di option-nya adalah number
                const matchedOption = options.find(
                  (opt) => opt.value.toString() === value
                );
                const parsedValue =
                  typeof matchedOption?.value === "number"
                    ? Number(value)
                    : value;

                field.onChange(parsedValue);
              }
            }}
            value={field.value?.toString()}
            defaultValue={field.value?.toString()}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger
                disabled={disabled}
                className={`${classname && classname} w-full text-xs`}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>

            {!disabled && (
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            )}
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
