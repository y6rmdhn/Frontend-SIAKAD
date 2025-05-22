import { FiSearch } from "react-icons/fi";
import { Input } from "@/components/ui/input";

function SearchInput({ placeholder = "Search", className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <FiSearch className="absolute top-1/2 -translate-y-1/2 right-2" />
      <Input placeholder={placeholder} className="w-60 sm:w-40 md:w-70 lg:w-80 pr-8" />
    </div>
  );
}

export default SearchInput;
