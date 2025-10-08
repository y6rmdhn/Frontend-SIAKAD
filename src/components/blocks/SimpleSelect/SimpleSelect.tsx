// components/SimpleSelect.tsx
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
import { useQuery } from "@tanstack/react-query";

type SimpleSelectProps = {
  form: any;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  queryKey: string;
  queryFn: () => Promise<any>;
  itemValue: string;
  itemLabel: string;
};

export const SimpleSelect = ({
  form,
  name,
  label,
  placeholder,
  required,
  queryKey,
  queryFn,
  itemValue,
  itemLabel,
}: SimpleSelectProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      try {
        const result = await queryFn();
        console.log("Query result:", result); // Debug
        return result;
      } catch (err) {
        console.error("Query error:", err);
        throw err;
      }
    },
  });

  console.log("Query state:", { data, isLoading, error }); // Debug state

  // Handle different data structures
  let options: any[] = [];

  if (Array.isArray(data)) {
    options = data;
  } else if (data && Array.isArray(data.data)) {
    options = data.data;
  }

  console.log("Final options:", options); // Debug final options

  const selectOptions = options.map((item) => ({
    label: item[itemLabel] || "No label",
    value: item[itemValue]?.toString() || "",
  }));

  console.log("Select options:", selectOptions); // Debug select options

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-start gap-2 flex-col lg:flex-row text-[#3F6FA9]">
          {label && (
            <FormLabel className="w-full text-xs sm:text-sm mt-0 lg:mt-2">
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <div className="w-full flex flex-col gap-1">
            <Select
              onValueChange={field.onChange}
              value={field.value?.toString()}
              disabled={isLoading}
            >
              <FormControl>
                <SelectTrigger className="w-full text-xs">
                  <SelectValue
                    placeholder={isLoading ? "Memuat data..." : placeholder}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {selectOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};
