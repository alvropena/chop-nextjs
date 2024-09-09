import { NotificationItem } from "./notification-item";
import { NotificationType } from "../../data/notification/notification-type";
import { NotificationListType } from "./types/notification-list-type";

export function NotificationList({ groupedNotifications, onMarkAsRead, onFollow }: NotificationListType) {
    return (
        <>
            {Object.keys(groupedNotifications).map(group => (
                groupedNotifications[group].length > 0 && (
                    <div key={group}>
                        <h2 className="text-xl font-bold">{group}</h2>
                        {groupedNotifications[group].map(notification => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                onMarkAsRead={onMarkAsRead}
                                onFollow={onFollow}
                            />
                        ))}
                    </div>
                )
            ))}
        </>
    );
}
