export interface SessionType {
    sessionId: string;
    userId: string;
    cardIds: string[];  // List of card IDs included in the session
    startedAt: string;
    completedAt?: string;  // Only present if the session was completed
    sessionLength?: number;  // Calculated if the session was completed
}
