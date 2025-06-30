import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";

type Option = {
  value: string;
  label: string;
};

interface SelectFilterProps {
  placeholder?: string;
  classname?: string;
  options: Option[];
  label?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

function SelectFilter({
  placeholder = "--Semua--",
  options = [],
  classname,
  label,
  value,
  onValueChange,
}: SelectFilterProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={`w-full text-xs lg:text-sm ${classname}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {options
            .filter((option) => option.value !== "")
            .map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectFilter;
