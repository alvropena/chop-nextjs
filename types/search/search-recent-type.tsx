export interface SearchRecentType {
    recentSearches: SearchResult[];
    handleSearchResultClick: (result: SearchResult) => void;
    handleDeleteRecentSearch: (id: string | undefined) => void;
}


interface SearchResult {
    id?: string;
    label?: string;
    username?: string;
    profile_picture?: string;
    name?: string;
    verified?: boolean;
}