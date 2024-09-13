// search-utils.tsx
import { UserProfileData } from "../data/user-profile-data";
import { SearchTopicData } from "../data/search-topic-data";

// Utility function to search for both users and topics
export const searchItems = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();

    // Filter users by name or username
    const userResults = UserProfileData.filter(
        (user) => user.name.toLowerCase().includes(lowerCaseQuery) || user.username.toLowerCase().includes(lowerCaseQuery)
    );

    // Filter topics by label
    const topicResults = SearchTopicData.filter(
        (topic) => topic.label.toLowerCase().includes(lowerCaseQuery)
    );

    // Combine user and topic results
    return [...userResults, ...topicResults];
};

// A function that handles input changes and sets query/results in the provider
export const handleInputChange = (
    query: string,
    setQuery: (query: string) => void,
    setSearchResults: (results: any) => void
) => {
    // Update query state
    setQuery(query);

    // Get the search results using the utility function
    const results = searchItems(query);

    // Update the search results state in the context
    setSearchResults(results);
};

