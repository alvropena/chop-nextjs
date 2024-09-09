import { getFormattedDate } from "../../../lib/format-date";
import { NotificationReminderType } from "../types/notification-reminder-type";

export function NotificationReminder({ notification, onMarkAsRead }: NotificationReminderType) {
    return (
        <div className="relative flex flex-col p-2 border-b" onClick={() => onMarkAsRead(notification.id)}>
            <div className="flex justify-between items-center">
                <small className="text-gray-500">{getFormattedDate(notification.timestamp)}</small>
            </div>
            <div className="mt-1">
                <p>{notification.message}</p>
            </div>
        </div>
    );
}
