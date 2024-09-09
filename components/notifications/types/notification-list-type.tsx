import { NotificationType } from "../../../data/notification/notification-type";

export interface NotificationListType {
    groupedNotifications: Record<string, NotificationType[]>;
    onMarkAsRead: (id: number) => void;
    onFollow: (userId: number) => void;
}