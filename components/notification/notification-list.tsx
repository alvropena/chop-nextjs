import { NotificationItem } from "./notification-item";
import { NotificationListType } from "../../types/notification/notification-list-type";

export function NotificationList({ notifications, onMarkAsRead, onFollow }: NotificationListType) {
    return (
        <>
            {notifications.map(notification => (
                <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={onMarkAsRead}
                    onFollow={onFollow}
                />
            ))}
        </>
    );
}
