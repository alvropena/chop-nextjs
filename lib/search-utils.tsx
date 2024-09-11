// lib/search-utils.ts

import { UserProfileData } from "../data/user-profile-data";
import { SearchTopicData } from "../data/search-topic-data";
import { UserProfileType } from "../types/user/user-profile-type";
import { SearchTopicType } from "../types/search/search-topic-type";

// Function to filter users and topics based on the search query
export function searchUsersAndTopics(query: string): { users: UserProfileType[]; topics: SearchTopicType[] } {
    const lowerQuery = query.toLowerCase();

    // Filter users based on name, username, or bio
    const filteredUsers = UserProfileData.filter(
        (user) =>
            user.name.toLowerCase().includes(lowerQuery) ||
            user.username.toLowerCase().includes(lowerQuery) ||
            user.bio.toLowerCase().includes(lowerQuery)
    );

    // Filter topics based on label
    const filteredTopics = SearchTopicData.filter((topic) =>
        topic.label.toLowerCase().includes(lowerQuery)
    );

    return { users: filteredUsers, topics: filteredTopics };
}
