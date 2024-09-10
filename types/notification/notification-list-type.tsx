import { NotificationType } from "./notification-type";

export interface NotificationListType {
    notifications: NotificationType[];
    onMarkAsRead: (notificationId: number) => void;
    onFollow: (userId: number) => void;
}
