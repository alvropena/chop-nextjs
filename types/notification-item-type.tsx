import { NotificationType } from "./notification-type";

export interface NotificationItemType {
    notification: NotificationType;
    onMarkAsRead: (id: number) => void;
    onFollow: (userId: number) => void;
}