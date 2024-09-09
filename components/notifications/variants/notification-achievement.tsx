import { getFormattedDate } from "../../../lib/format-date";
import { NotificationAchievementType } from "../types/notification-achievement-type";

export function NotificationAchievement({ notification, onMarkAsRead }: NotificationAchievementType) {
    if (notification.type !== 'achievement') {
        return null;
    }

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
