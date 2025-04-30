import {
  FormControl,
  FormDescription,
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
  type?: "file";
  placeholder?: string;
  labelStyle?: string;
  required: boolean;
};

export const FormFieldInputFile = ({
  form,
  name,
  label,
  labelStyle,
  required,
}: FormFieldInputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex w-full">
          <FormLabel className={`w-full ${labelStyle}`}>
            {label}
            {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <div className="flex flex-col w-full">
            <FormControl>
              <Input
                type="file"
                className="w-full"
                onChange={(e) => field.onChange(e.target.files?.[0])}
              />
            </FormControl>
            <FormDescription className="text-xs">
              jpg.jpg.pdf(maxsize 2.007152 MB)
            </FormDescription>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
