import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";
import { SearchInputType } from "./types/search-input-type";

export function SearchInput({ searchQuery, setSearchQuery, handleSearch, inputRef }: SearchInputType) {
    return (
        <div className="flex gap-2 mb-4">
            <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                ref={inputRef}
            />
            <Button variant="default" onClick={handleSearch}>
                <SearchIcon />
            </Button>
        </div>
    );
}
