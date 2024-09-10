import { createContext } from 'react';
import { NotificationType } from '../types/notification/notification-type';

// Creating the context for notifications
export const NotificationsContext = createContext<{
    notifications: NotificationType[];
    markAsRead: (id: number) => void;
} | undefined>(undefined);
