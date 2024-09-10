'use client';

import { type ReactNode, createContext, useContext, useRef } from 'react';
import { useStore, StoreApi } from 'zustand';
import { createNotificationsStore } from '../store/notification-store';
import { NotificationsStore } from '../store/notification-store';

export const NotificationsStoreContext = createContext<
  StoreApi<ReturnType<typeof createNotificationsStore>> | undefined
>(undefined);

export interface NotificationsStoreProviderProps {
  children: ReactNode;
}

export const NotificationsStoreProvider = ({
  children,
}: NotificationsStoreProviderProps) => {
  const storeRef = useRef<ReturnType<typeof createNotificationsStore>>();
  if (!storeRef.current) {
    storeRef.current = createNotificationsStore();
  }

  return (
    <NotificationsStoreContext.Provider value={storeRef.current}>
      {children}
    </NotificationsStoreContext.Provider>
  );
};

export const useNotificationsStore = <T,>(
  selector: (state: NotificationsStore) => T
): T => {
  const store = useContext(NotificationsStoreContext);
  if (!store) {
    throw new Error('useNotificationsStore must be used within NotificationsStoreProvider');
  }

  return useStore(store, selector);
};
