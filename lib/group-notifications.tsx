import { format, isToday, isYesterday, subDays, isSameMonth } from 'date-fns';
import { NotificationType } from "../data/notification/notification-type";

// Create a new interface for the grouped notifications with formattedDate
interface GroupedNotification extends NotificationType {
    formattedDate: string;
}

export function groupNotifications(notifications: NotificationType[]): Record<string, GroupedNotification[]> {
    const grouped: Record<string, GroupedNotification[]> = {
        Today: [],
        Yesterday: [],
        "Last Week": [],
        "This Month": [],
        "Last Month": [],
        Older: []
    };

    notifications.forEach(notification => {
        const notificationDate = new Date(notification.timestamp);
        const formattedDate = format(notificationDate, 'MM/dd - hh:mm a');

        // Create a new object with the formatted date and push to the appropriate group
        const groupedNotification: GroupedNotification = {
            ...notification,
            formattedDate
        };

        if (isToday(notificationDate)) {
            grouped.Today.push(groupedNotification);
        } else if (isYesterday(notificationDate)) {
            grouped.Yesterday.push(groupedNotification);
        } else if (isSameMonth(notificationDate, subDays(new Date(), 30))) {
            grouped["This Month"].push(groupedNotification);
        } else {
            grouped.Older.push(groupedNotification);
        }
    });

    return grouped;
}
