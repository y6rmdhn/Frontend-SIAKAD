import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

type FormFieldInputProps = {
  form: any;
  name: string;
  label: string;
  type?: "file";
  placeholder?: string;
  labelStyle?: string;
  classname: string;
  required: boolean;
};

export const FormFieldInputFile = ({
  form,
  name,
  label,
  classname,
  labelStyle,
  required,
}: FormFieldInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full flex flex-col lg:flex-row">
          <FormLabel className={`w-full text-xs sm:text-sm ${labelStyle}`}>
            {label}
            {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <div className="flex w-full flex-col gap-1">
              <div className="flex w-full items-center gap-3">
                <Button
                  type="button"
                  size="sm"
                  className="bg-zinc-300 text-xs lg:text-sm hover:bg-zinc-200 text-black cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose File
                </Button>
                <span
                  className="text-xs lg:text-sm text-muted-foreground truncate max-w-[200px]"
                  title={field.value?.name}
                >
                  {field.value?.name
                    ? field.value.name.length > 10
                      ? field.value.name.slice(0, 18) + "..."
                      : field.value.name
                    : "No file chosen"}
                </span>
                <Input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".jpg,.jpeg,.pdf"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </div>
              <FormDescription className="text-xs text-blue-500 whitespace-pre-line">
                jpg.jpeg.pdf(nmaks. 2 MB
              </FormDescription>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
