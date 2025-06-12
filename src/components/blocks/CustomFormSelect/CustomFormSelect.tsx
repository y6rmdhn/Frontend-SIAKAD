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
  labelStyle?: string;
  disabled?: boolean;
  required?: boolean;
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
              <FormItem
                  className={`flex items-start gap-y-5 flex-col lg:flex-row ${classname}`}
              >
                {label && (
                    <FormLabel
                        className={`w-full text-xs sm:text-sm mt-0 lg:mt-2 ${labelStyle}`}
                    >
                      {label} {required && <span className="text-red-500">*</span>}
                    </FormLabel>
                )}

                {/* ===== BAGIAN YANG DIPERBAIKI ADA DI SINI ===== */}
                <div className="w-full flex flex-col gap-1">
                  <Select
                      onValueChange={(value) => {
                        // Logika Anda untuk mengubah kembali ke number sudah bagus
                        // dan tidak perlu diubah.
                        const matchedOption = options.find(
                            (opt) => opt.value.toString() === value
                        );
                        const parsedValue =
                            typeof matchedOption?.value === "number"
                                ? Number(value)
                                : value;

                        field.onChange(parsedValue);
                      }}
                      value={field.value?.toString()}
                      disabled={disabled}
                  >
                    <FormControl>
                      <SelectTrigger
                          disabled={disabled}
                          className={`w-full text-xs`}
                      >
                        <SelectValue placeholder={placeholder} />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {options.map((option) => (
                          <SelectItem
                              key={option.value}
                              value={option.value.toString()}
                          >
                            {option.label}
                          </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </div>
                {/* ===== AKHIR BAGIAN PERBAIKAN ===== */}

              </FormItem>
          )}
      />
  );
};