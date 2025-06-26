import React from "react";
import { FiSearch } from "react-icons/fi";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

function SearchInput({
  placeholder = "Search",
  className = "",
  value,
  onChange,
}: SearchInputProps) {
  return (
    <div className="w-full md:w-80">
      <div className={`relative ${className}`}>
        <FiSearch className="absolute top-1/2 -translate-y-1/2 right-2" />
        <Input
          placeholder={placeholder}
          className="pr-8 text-xs md:text-sm"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default SearchInput;
