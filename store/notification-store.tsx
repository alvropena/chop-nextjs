import { create } from 'zustand';
import { NotificationType } from '../data/notification/notification-type';
import { NotificationData } from '../data/notification/notification-data';

export interface NotificationsStore {
    notifications: NotificationType[];
    markAsRead: (id: number) => void;
    getUnreadCount: () => number;
}

export const createNotificationsStore = () =>
    create<NotificationsStore>((set) => ({
        notifications: NotificationData,

        markAsRead: (id) =>
            set((state) => ({
                notifications: state.notifications.map((notification) =>
                    notification.id === id ? { ...notification, read: true } : notification
                ),
            })),

        getUnreadCount: () =>
            NotificationData.filter((notification) => !notification.read).length,
    }));
