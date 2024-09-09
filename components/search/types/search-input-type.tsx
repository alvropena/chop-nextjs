import { RefObject } from "react";

export interface SearchInputType {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    handleSearch: () => void;
    inputRef: RefObject<HTMLInputElement>;
}
