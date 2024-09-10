import { NotificationType } from "../../../types/notification-type";

export interface NotificationItemType {
    notification: NotificationType;
    onMarkAsRead: (id: number) => void;
    onFollow: (userId: number) => void;
}