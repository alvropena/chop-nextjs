"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useNotifications } from "../../../../hooks/use-notifications";
import { NotificationList } from "../../../../components/notification-list";
import { groupNotifications } from "../../../../lib/group-notifications";
import { markAsRead } from "../../../../lib/mark-as-read";
import { NotificationType } from "../../../../types/notification-type";

export default function NotificationsContainer() {
    const router = useRouter();
    const t = useTranslations("");

    const { notifications } = useNotifications(); // Access notifications from context
    const [groupedNotifications, setGroupedNotifications] = useState<Record<string, NotificationType[]>>({});

    // Sort and group notifications whenever notifications state changes
    useEffect(() => {
        const sortedNotifications = [...notifications].sort(
            (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setGroupedNotifications(groupNotifications(sortedNotifications));
    }, [notifications]);

    // Handle marking notifications as read
    const handleMarkAsRead = (notificationId: number) => {
        const updatedGroupedNotifications = markAsRead(groupedNotifications, notificationId);
        setGroupedNotifications(updatedGroupedNotifications); // Update the grouped notifications state
    };

    const handleFollow = (userId: number) => {
        console.log(`Followed user with ID ${userId}`);
    };

    return (
        <div className="flex justify-center h-fit bg-background text-foreground p-8">
            <div className="flex flex-col space-y-6 w-full max-w-xl">
                <h1 className="text-2xl font-semibold">{t("Notifications")}</h1>
                <NotificationList
                    groupedNotifications={groupedNotifications}
                    onMarkAsRead={handleMarkAsRead}
                    onFollow={handleFollow}
                />
                {Object.keys(groupedNotifications).every(group => groupedNotifications[group].length === 0) && (
                    <h2>No activity yet.</h2>
                )}
            </div>
        </div>
    );
}
