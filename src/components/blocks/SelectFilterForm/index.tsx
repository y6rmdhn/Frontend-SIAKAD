import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

type Option = {
  label: string;
  value: string;
};

type FormFieldSelectProps = {
  form: any;
  name: string;
  label?: string;
  placeholder?: string;
  labelStyle?: string;
  selectStyle?: string;
  required?: boolean;
  options: Option[];
};

export const SelectFilter = ({
  form,
  name,
  label,
  placeholder = "--Pilih--",
  labelStyle,
  selectStyle,
  required = false,
  options,
}: FormFieldSelectProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2">
          {label && (
            <FormLabel className={`${labelStyle} ${label && "hidden"}`}>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}

          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className={`${selectStyle} w-full`}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
