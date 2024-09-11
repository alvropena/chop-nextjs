// lib/search-utils.ts

import { UserProfileData } from "../data/user-profile-data";
import { SearchTopicData } from "../data/search-topic-data";
import { UserProfileType } from "../types/user/user-profile-type";
import { SearchTopicType } from "../types/search/search-topic-type";

// Function to filter users and topics based on the search query, and remove duplicate topics
export function searchUsersAndTopics(query: string): { users: UserProfileType[]; topics: SearchTopicType[] } {
    const lowerQuery = query.toLowerCase();

    // Filter users based on name, username, or bio
    const filteredUsers = UserProfileData.filter(
        (user) =>
            user.name.toLowerCase().includes(lowerQuery) ||
            user.username.toLowerCase().includes(lowerQuery) ||
            user.bio.toLowerCase().includes(lowerQuery)
    );

    // Filter topics based on label and remove duplicates
    const filteredTopics = Array.from(
        new Set(SearchTopicData.map(topic => topic.label.toLowerCase()))
    ).map(label => SearchTopicData.find(topic => topic.label.toLowerCase() === label)!);

    return { users: filteredUsers, topics: filteredTopics };
}
