export interface SearchResultsType {
    searchResults: SearchResult[];
    handleSearchResultClick: (result: SearchResult) => void;
}


interface SearchResult {
    id?: string;
    label?: string;
    username?: string;
    profile_picture?: string;
    name?: string;
}