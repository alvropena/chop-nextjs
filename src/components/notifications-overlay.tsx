"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  formatDistanceToNow,
  parseISO,
  isToday,
  isYesterday,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
} from "date-fns";
import { Button } from "@/components/ui/button";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function NotificationsOverlay() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { user } = useUser();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/notifications?user_id=${user?.sub}`
        );
        const filteredNotifications = response.data.filter(
          (notification: any) => notification.type_notification === "follow"
        );
        setNotifications(filteredNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [baseUrl, user?.sub]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const groupNotifications = (notifications: any[]) => {
    const groups: any = {
      today: [],
      yesterday: [],
      thisWeek: [],
      lastWeek: [],
      thisMonth: [],
      older: [],
    };

    notifications.forEach((notification: any) => {
      const date = parseISO(notification.created_at);
      const now = new Date();
      const daysDiff = differenceInDays(now, date);
      const weeksDiff = differenceInWeeks(now, date);
      const monthsDiff = differenceInMonths(now, date);

      if (isToday(date)) {
        groups.today.push(notification);
      } else if (isYesterday(date)) {
        groups.yesterday.push(notification);
      } else if (daysDiff < 7) {
        groups.thisWeek.push(notification);
      } else if (weeksDiff === 1) {
        groups.lastWeek.push(notification);
      } else if (monthsDiff === 0) {
        groups.thisMonth.push(notification);
      } else {
        groups.older.push(notification);
      }
    });

    return groups;
  };

  const groupedNotifications = groupNotifications(notifications);

  const renderNotificationGroup = (title: string, notifications: any[]) => {
    if (notifications.length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className="font-semibold mb-2">{title}</h3>
        <ul>
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className="flex items-center justify-between mb-2 rounded-lg"
            >
              <div className="flex items-center">
                <img
                  src={notification.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(parseISO(notification.created_at), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
              {notification.action && (
                <Button
                  size="sm"
                  variant="outline"
                  className="text-blue-500 border-blue-500 hover:bg-blue-50"
                >
                  {notification.action}
                </Button>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="p-4 max-h-[80vh] overflow-y-auto">
      {renderNotificationGroup("Hoy", groupedNotifications.today)}
      {renderNotificationGroup("Ayer", groupedNotifications.yesterday)}
      {renderNotificationGroup("Esta semana", groupedNotifications.thisWeek)}
      {renderNotificationGroup(
        "La semana pasada",
        groupedNotifications.lastWeek
      )}
      {renderNotificationGroup("Este mes", groupedNotifications.thisMonth)}
      {renderNotificationGroup("Más antiguas", groupedNotifications.older)}
    </div>
  );
}