import { Input } from "../ui/input";
import { XIcon } from "lucide-react";  // Import XIcon for the clear button
import { SearchInputType } from "../../types/search/search-input-type";

export function SearchInput({ searchQuery, setSearchQuery, handleClearSearch, inputRef }: SearchInputType) {
    return (
        <div className="flex items-center gap-2 mb-4 relative">
            {/* Input Field */}
            <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}  // Update search query dynamically
                ref={inputRef}
                className="pr-10"  // Padding-right to make space for the X button
            />

            {/* Always show the X button inside the input, regardless of searchQuery */}
            <XIcon
                className="absolute right-14 cursor-pointer text-gray-500 hover:text-black"
                onClick={handleClearSearch}  // Call handleClearSearch to reset the search
            />
        </div>
    );
}
