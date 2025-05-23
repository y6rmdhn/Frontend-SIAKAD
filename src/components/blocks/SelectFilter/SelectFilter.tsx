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
}

function SelectFilter({
  placeholder = "--Semua--",
  options = [],
  classname,
}: SelectFilterProps) {
  return (
    <Select>
      <SelectTrigger className={`w-full ${classname}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Unit Kerja</SelectLabel>
          {options.map((option) => (
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
