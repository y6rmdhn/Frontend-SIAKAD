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
  label: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  labelStyle: string;
  required: boolean;
};

export const FormFieldSelect = ({
  form,
  name,
  label,
  placeholder,
  options,
  labelStyle,
  required,
}: FormFieldSelectProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex">
          <FormLabel className={`w-full ${labelStyle}`}>
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
