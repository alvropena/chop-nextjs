import { SearchTopicType } from './search-topic-type';
import { SearchResultType } from './search-result-type';

export type SearchContextType = {
    query: string;  // The current search query string
    recentSearches: SearchResultType[];  // Array to store recent searches (users or topics)
    trendingTopics: SearchTopicType[];  // Array to store trending topics
    searchResults: SearchResultType[];  // Array to store search results
    searchClicked: boolean;  // Boolean to track if a search has been clicked
    setQuery: (query: string) => void;  // Function to update the search query
    setSearchClicked: (clicked: boolean) => void;  // Function to update searchClicked state
    addRecentSearch: (search: SearchResultType) => void;  // Function to add a recent search (either user or topic)
    setSearchResults: (results: SearchResultType[]) => void;  // Function to set the search results
    fetchTrendingTopics: () => Promise<void>;  // Function to fetch trending topics
    handleClearAll: () => void;  // Function to clear all recent searches
    handleClearSearch: () => void;  // Function to clear the search query and results
    handleRemoveRecentSearch: (id: string) => void;  // Function to remove a recent search by its ID
};
