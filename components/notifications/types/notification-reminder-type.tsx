import { NotificationType } from "../../../data/notification/notification-type";

export interface NotificationReminderType {
    notification: NotificationType;
    onMarkAsRead: (id: number) => void;
}