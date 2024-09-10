"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useNotifications } from "../../../../hooks/use-notifications";
import { NotificationList } from "../../../../components/notification/notification-list";
import { NotificationType } from "../../../../types/notification/notification-type";

export default function NotificationsContainer() {
    const router = useRouter();
    const t = useTranslations("");

    const { notifications } = useNotifications(); // Access notifications from context
    const [displayedNotifications, setDisplayedNotifications] = useState<NotificationType[]>([]);

    useEffect(() => {
        setDisplayedNotifications(notifications); // Directly display notifications
    }, [notifications]);

    const handleMarkAsRead = (notificationId: number) => {
        // Handle marking notifications as read here (if needed)
    };

    const handleFollow = (userId: number) => {
        console.log(`Followed user with ID ${userId}`);
    };

    return (
        <div className="flex justify-center h-fit bg-background text-foreground p-8">
            <div className="flex flex-col space-y-6 w-full max-w-xl">
                <h1 className="text-2xl font-semibold">{t("Notifications")}</h1>
                <NotificationList
                    notifications={displayedNotifications} // Pass notifications as-is
                    onMarkAsRead={handleMarkAsRead}
                    onFollow={handleFollow}
                />
                {displayedNotifications.length === 0 && (
                    <h2>No activity yet.</h2>
                )}
            </div>
        </div>
    );
}
