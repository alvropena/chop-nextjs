export interface TopicType {
    id: string;       // Unique identifier for the topic
    userId: string;   // Reference to the user who searched the topic
    label: string;    // Label of the topic (e.g., "Geography", "History")
    emoji: string;    // Emoji representing the topic
}
