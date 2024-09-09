import { NotificationType } from "../../../data/notification/notification-type";

export interface NotificationFollowType {
    notification: NotificationType;
    onMarkAsRead: (id: number) => void;
    onFollow: (userId: number) => void;
}