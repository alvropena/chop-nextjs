import { UserActivityType } from "../types/user/user-activity-type";

export const userActivityData: UserActivityType = {
  userId: "user_001",
  experience: 50,
  lives: 3,
  streak: 2,
  lastSessionDate: "2024-01-10",
  answeredCards: [
    {
      cardId: "card_001",
      isCorrect: true,
      answeredAt: "2024-01-10T10:05:00Z",
      timeSpent: 5,
    },
  ],
  unansweredCards: [
    {
      cardId: "card_002",
      addedAt: "2024-01-10T10:00:00Z",
      timeSpent: 0,
    },
  ],
  completedSessions: [
    {
      sessionId: "session_001",
      completedAt: "2024-01-10T10:15:00Z",
      sessionLength: 15,
    },
  ],
  uncompletedSessions: [],
  achievements: [
    {
      achievementId: "achv_001",
      name: "First Session Complete",
      description: "Completed the first session successfully",
      unlockedAt: "2024-01-10T10:15:00Z",
    },
  ],
};
