import { NotificationType } from "./notification-type";

export interface NotificationAchievementType {
    notification: NotificationType;
    onMarkAsRead: (id: number) => void;
}