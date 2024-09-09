import { createStore } from "zustand/vanilla";

export type NotificationsState = {
  notifications: {};
};

export type NotificationsActions = {
  setNotifications: (NotificationsInfo: Partial<NotificationsState>) => void;
  clearNotifications: () => void;
};

export type NotificationsStore = NotificationsState & NotificationsActions;

export const defaultInitState: NotificationsState = {
  notifications: {},
};

export const createNotificationsStore = (
  initState: NotificationsState = defaultInitState
) => {
  return createStore<NotificationsStore>()((set) => ({
    ...initState,
    setNotifications: (notificationsInfo) =>
      set((state) => ({
        notifications: { ...state.notifications, ...notificationsInfo },
      })),
    clearNotifications: () =>
      set((state) => ({ notifications: defaultInitState.notifications })),
  }));
};
