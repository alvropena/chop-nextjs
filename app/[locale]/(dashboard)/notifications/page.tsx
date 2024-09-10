"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useNotifications } from "../../../../hooks/use-notifications";
import { NotificationList } from "../../../../components/notification/notification-list";
import { markAsRead } from "../../../../lib/mark-as-read";
import { NotificationType } from "../../../../types/notification-type";

export default function NotificationsContainer() {
    const router = useRouter();
    const t = useTranslations("");

    const { notifications } = useNotifications(); // Access notifications from context
    const [sortedNotifications, setSortedNotifications] = useState<NotificationType[]>([]);

    // Sort notifications from most recent to oldest
    useEffect(() => {
        const sorted = [...notifications].sort(
            (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setSortedNotifications(sorted);
    }, [notifications]);

    // Handle marking notifications as read
    const handleMarkAsRead = (notificationId: number) => {
        const updatedNotifications = markAsRead(sortedNotifications, notificationId);
        setSortedNotifications(updatedNotifications);
    };

    const handleFollow = (userId: number) => {
        console.log(`Followed user with ID ${userId}`);
    };

    return (
        <div className="flex justify-center h-fit bg-background text-foreground p-8">
            <div className="flex flex-col space-y-6 w-full max-w-xl">
                <h1 className="text-2xl font-semibold">{t("Notifications")}</h1>
                <NotificationList
                    notifications={sortedNotifications}
                    onMarkAsRead={handleMarkAsRead}
                    onFollow={handleFollow}
                />
                {sortedNotifications.length === 0 && (
                    <h2>No activity yet.</h2>
                )}
            </div>
        </div>
    );
}
