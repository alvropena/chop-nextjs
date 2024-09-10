import { NotificationType } from "../../../types/notification-type";

export interface NotificationReminderType {
    notification: NotificationType;
    onMarkAsRead: (id: number) => void;
}