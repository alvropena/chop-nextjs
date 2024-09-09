"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useSchemaStore } from "../../../../providers/schema-store-provider";
import { NotificationData } from "../../../../data/notification/notification-data";
import { NotificationList } from "../../../../components/notifications/notification-list";
import { groupNotifications } from "../../../../lib/group-notifications";
import { markAsRead } from "../../../../lib/mark-as-read";

export default function NotificationsContainer() {
    const { user_input_generation } = useSchemaStore((state) => state);
    const router = useRouter();
    const t = useTranslations("");

    const [groupedNotifications, setGroupedNotifications] = useState<Record<string, NotificationType[]>>({});

    useEffect(() => {
        const sorted = [...NotificationData].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setGroupedNotifications(groupNotifications(sorted));
    }, []);

    const handleFollow = (userId: number) => {
        console.log(`Followed user with ID ${userId}`);
    };

    const handleMarkAsRead = (notificationId: number) => {
        setGroupedNotifications(prevState => markAsRead(prevState, notificationId));
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
