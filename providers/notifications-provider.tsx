'use client';

import { ReactNode, useState } from 'react';
import { NotificationsContext } from '../context/notification-context';
import { NotificationData } from '../data/notification-data';
import { NotificationType } from '../types/notification-type';

export interface NotificationsProviderProps {
  children: ReactNode;
}

export const NotificationsProvider = ({ children }: NotificationsProviderProps) => {
  const [notifications, setNotifications] = useState<NotificationType[]>(NotificationData);

  // Function to mark a notification as read
  const markAsRead = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <NotificationsContext.Provider value={{ notifications, markAsRead }}>
      {children}
    </NotificationsContext.Provider>
  );
};
