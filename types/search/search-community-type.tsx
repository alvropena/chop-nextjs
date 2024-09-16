export interface SearchCommunityType {
    id: string;  // Unique identifier for each search event (search instance)
    communityId: string;  // Unique identifier for the community being searched
    userId: string;  // The user performing the search
    timestamp: Date;  // When the search happened
}
