export type NotificationType =
    | FollowNotification
    | ReminderNotification
    | AchievementNotification;

interface BaseNotification {
    id: number;
    message: string;
    timestamp: Date;
    read: boolean;
}

interface FollowNotification extends BaseNotification {
    type: 'follow';
    userId: number;
    followed: string;
}

interface ReminderNotification extends BaseNotification {
    type: 'reminder';
    reminderType: string;
}

interface AchievementNotification extends BaseNotification {
    type: 'achievement';
    userId: null;
}
