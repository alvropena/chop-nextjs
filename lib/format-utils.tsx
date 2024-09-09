import { format } from 'date-fns';

// Format the activity timestamp based on the year
export function formatActivityTimestamp(timestamp: string) {
    const date = new Date(timestamp);
    const currentYear = new Date().getFullYear();
    const activityYear = date.getFullYear();

    return currentYear === activityYear ? format(date, "MMM d") : format(date, "MMM d, yyyy");
}

// Format the number with 'k' or 'm' suffix if large
export function formatNumber(num: number): string {
    if (num < 1000) {
        return num.toString();
    } else if (num < 1000000) {
        return (num / 1000).toFixed(1) + 'k';
    } else {
        return (num / 1000000).toFixed(1) + 'm';
    }
}
