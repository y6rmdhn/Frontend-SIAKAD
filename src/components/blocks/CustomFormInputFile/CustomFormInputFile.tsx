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
import { useFormContext } from "react-hook-form";

type FormFieldInputFileProps = {
  name: string;
  label?: string;
  labelStyle?: string;
  classname?: string;
  required?: boolean;
  accept?: string;
  description?: string;
};

export const FormFieldInputFile = ({
  name,
  label,
  classname,
  labelStyle,
  required,
  accept = "application/pdf,image/jpeg,image/jpg,image/png",
  description = "PDF, JPG, JPEG, PNG (Maks. 2MB)",
}: FormFieldInputFileProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={`flex items-start gap-2 flex-col lg:flex-row ${
            classname || ""
          }`}
        >
          <FormLabel
            className={`w-full text-xs sm:text-sm mt-0 lg:mt-2 ${
              labelStyle || ""
            }`}
          >
            {label}
            {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <div className="w-full flex flex-col gap-1">
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
                    title={field.value?.[0]?.name || "No file chosen"}
                  >
                    {field.value instanceof FileList && field.value.length > 0
                      ? field.value[0].name
                      : "No file chosen"}
                  </span>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept={accept}
                    onChange={(e) => {
                      field.onChange(e.target.files);
                      form.trigger(name);
                    }}
                    onBlur={field.onBlur}
                  />
                </div>
                <FormDescription className="text-xs text-blue-500 whitespace-pre-line">
                  {description}
                </FormDescription>
              </div>
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};
