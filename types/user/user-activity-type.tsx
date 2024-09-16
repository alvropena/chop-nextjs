export interface UserActivityType {
    userId: string;
    experience: number;
    lives: number;
    streak: number;
    lastSessionDate: string;

    answeredCards: {
        cardId: string;     // Links to CardType
        isCorrect: boolean;
        answeredAt: string;
        timeSpent: number;
    }[];

    unansweredCards: {
        cardId: string;     // Links to CardType
        addedAt: string;
        timeSpent: number;
    }[];

    completedSessions: {
        sessionId: string;  // Links to SessionType
        completedAt: string;
        sessionLength: number;
    }[];

    uncompletedSessions: {
        sessionId: string;  // Links to SessionType
        startedAt: string;
        timeSpent: number;
    }[];

    achievements: {
        achievementId: string;
        name: string;
        description: string;
        unlockedAt: string;
    }[];
}
