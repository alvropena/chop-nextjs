import { NotificationType } from "../../../types/notification-type";

export interface NotificationFollowType {
    notification: NotificationType;
    onMarkAsRead: (id: number) => void;
    onFollow: (userId: number) => void;
}