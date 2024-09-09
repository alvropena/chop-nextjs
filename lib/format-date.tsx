import { isToday, isYesterday, format } from "date-fns";

export function getFormattedDate(timestamp: string | Date): string {
    const notificationDate = typeof timestamp === "string" ? new Date(timestamp) : timestamp;

    if (isToday(notificationDate)) {
        return format(notificationDate, 'p');
    }

    if (isYesterday(notificationDate)) {
        return format(notificationDate, 'p');
    }

    return format(notificationDate, 'MM/dd hh:mm a');
}
