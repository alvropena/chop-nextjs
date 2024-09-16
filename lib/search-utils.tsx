import { UserProfileData } from "../data/user-profile-data";
import { CommunitiesData } from "../data/community-data";
import { CommunityType } from "../types/community/community-type";

// Simulated function to fetch community details by communityId
export const fetchCommunityDetails = (communityId: string): CommunityType | undefined => {
  return CommunitiesData.find((community) => community.id === communityId);
};

// Search function to filter users and communities based on query
export const searchItems = (query: string) => {
  const lowerCaseQuery = query.toLowerCase();

  // Filter users by name or username
  const userResults = UserProfileData.filter(
    (user) => user.name.toLowerCase().includes(lowerCaseQuery) || user.username.toLowerCase().includes(lowerCaseQuery)
  );

  // Filter communities by name
  const communityResults = CommunitiesData.filter(
    (community) => community.name.toLowerCase().includes(lowerCaseQuery)
  );

  // Combine user and community results
  return [...userResults, ...communityResults];
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
