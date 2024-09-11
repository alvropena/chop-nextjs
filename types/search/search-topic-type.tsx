export interface SearchTopicType {
    id: string;       // Unique identifier for the search
    userId: string;   // Reference to the user who searched the topic
    label: string;    // Label of the topic (e.g., "Geography")
    timestamp: Date;  // Time when the search happened
    emoji: string;    // Emoji representing the topic
}
