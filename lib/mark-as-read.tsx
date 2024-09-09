import { NotificationType } from "../data/notification/notification-type";

export function markAsRead(
    notifications: Record<string, NotificationType[]>,
    notificationId: number
): Record<string, NotificationType[]> {
    const updatedNotifications = { ...notifications };
    Object.keys(updatedNotifications).forEach(group => {
        updatedNotifications[group] = updatedNotifications[group].map(notification =>
            notification.id === notificationId ? { ...notification, read: true } : notification
        );
    });
    return updatedNotifications;
}
