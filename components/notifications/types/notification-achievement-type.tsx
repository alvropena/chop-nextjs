import { NotificationType } from "../../../types/notification-type";

export interface NotificationAchievementType {
    notification: NotificationType;
    onMarkAsRead: (id: number) => void;
}