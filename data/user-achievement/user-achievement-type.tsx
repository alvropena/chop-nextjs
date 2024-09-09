export interface UserAchievementType {
    id: string;
    userId: string;         // Reference to the user who earned the achievement
    title: string;          // Achievement title (e.g., "Completed 100 study sessions")
    timestamp: string;      // When the achievement was earned
}
