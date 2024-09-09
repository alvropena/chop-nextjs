export interface UserActivityType {
    id: string;                      // Unique identifier for the activity
    userId: string;                  // Reference to the user who performed the activity
    action: string;                  // Description of the activity
    timestamp: string;               // Timestamp of the activity
    likes: number;                   // Number of likes for this activity
}
