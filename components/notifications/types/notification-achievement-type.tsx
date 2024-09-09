import { NotificationType } from "../../../data/notification/notification-type";

export interface NotificationAchievementType {
    notification: NotificationType;
    onMarkAsRead: (id: number) => void;
}