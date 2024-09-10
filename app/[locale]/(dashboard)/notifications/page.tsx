"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useSchemaStore } from "../../../../providers/schema-store-provider";
import { useNotifications } from "../../../../hooks/use-notifications";
import { NotificationList } from "../../../../components/notification-list";
import { groupNotifications } from "../../../../lib/group-notifications";
import { markAsRead } from "../../../../lib/mark-as-read";
import { NotificationType } from "../../../../types/notification-type";

export default function NotificationsContainer() {
    const { user_input_generation } = useSchemaStore((state) => state); // Optional: Check if still needed
    const router = useRouter();
    const t = useTranslations("");

    const { notifications, markAsRead } = useNotifications(); // Updated to use the context-based notifications
    const [groupedNotifications, setGroupedNotifications] = useState<Record<string, NotificationType[]>>({});

    // Sort and group notifications from context
    useEffect(() => {
        const sorted = [...notifications].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setGroupedNotifications(groupNotifications(sorted));
    }, [notifications]);

    const handleFollow = (userId: number) => {
        console.log(`Followed user with ID ${userId}`);
    };

    const handleMarkAsRead = (notificationId: number) => {
        markAsRead(notificationId); // Updated to call the context function
        setGroupedNotifications((prevState) => markAsRead(prevState, notificationId));
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
