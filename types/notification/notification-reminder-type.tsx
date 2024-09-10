import { NotificationType } from "./notification-type";

export interface NotificationReminderType {
    notification: NotificationType;
    onMarkAsRead: (id: number) => void;
}