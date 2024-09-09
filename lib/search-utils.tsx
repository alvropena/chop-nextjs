import { SearchType } from "../components/search/types/search-type";

// Filter user profiles based on the search query
export const filterUserProfiles = (userProfiles: any[], searchQuery: string) => {
    return userProfiles.filter(profile =>
        profile.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
};

// Filter topics based on the search query
export const filterTopics = (topics: any[], searchQuery: string) => {
    return topics.filter(topic =>
        topic.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
};

export const updateRecentSearches = (recentSearches: SearchType[], result: SearchType): SearchType[] => {
    const existingIndex = recentSearches.findIndex(
        (item) => item.id === result.id || item.label === result.label
    );

    let updatedRecentSearches;
    if (existingIndex !== -1) {
        updatedRecentSearches = [...recentSearches];
        updatedRecentSearches.splice(existingIndex, 1);
        updatedRecentSearches.push(result);
    } else {
        updatedRecentSearches = [...recentSearches, result];
    }

    return updatedRecentSearches.slice(-7); // Keep only the last 7 searches
};

export const removeRecentSearch = (recentSearches: SearchType[], id: string): SearchType[] => {
    return recentSearches.filter((search) => search.id !== id && search.label !== id);
};


