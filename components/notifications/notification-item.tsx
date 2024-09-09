import { NotificationFollow } from "./variants/notification-follow";
import { NotificationReminder } from "./variants/notification-reminder";
import { NotificationAchievement } from "./variants/notification-achievement";
import { NotificationItemType } from "./types/notification-item-type";

export function NotificationItem({ notification, onMarkAsRead, onFollow }: NotificationItemType) {
    switch (notification.type) {
        case "follow":
            return <NotificationFollow notification={notification} onMarkAsRead={onMarkAsRead} onFollow={onFollow} />;
        case "reminder":
            return <NotificationReminder notification={notification} onMarkAsRead={onMarkAsRead} />;
        case "achievement":
            return <NotificationAchievement notification={notification} onMarkAsRead={onMarkAsRead} />;
        default:
            return null;
    }
}
