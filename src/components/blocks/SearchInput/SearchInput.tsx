import { FiSearch } from "react-icons/fi";
import { Input } from "@/components/ui/input";

function SearchInput({ placeholder = "Search", className = "" }) {
  return (
      <div className="w-full md:w-80">
        <div className={`relative ${className}`}>
          <FiSearch className="absolute top-1/2 -translate-y-1/2 right-2" />
          <Input
            placeholder={placeholder}
            className="pr-8 text-xs md:text-sm"
          />
        </div>
      </div>
  );
}

export default SearchInput;
