'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type ThreadStore, createThreadStore } from '../store/thread-store'
export type ThreadStoreApi = ReturnType<typeof createThreadStore>

export const ThreadStoreContext = createContext<ThreadStoreApi | undefined>(
  undefined
)

export interface ThreadStoreProviderProps {
  children: ReactNode
}

export const ThreadStoreProvider = ({ children }: ThreadStoreProviderProps) => {
  const storeRef = useRef<ThreadStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createThreadStore()
  }

  return (
    <ThreadStoreContext.Provider value={storeRef.current}>
      {children}
    </ThreadStoreContext.Provider>
  )
}

export const useThreadStore = <T,>(selector: (store: ThreadStore) => T): T => {
  const threadStoreContext = useContext(ThreadStoreContext)

  if (!threadStoreContext) {
    throw new Error(`threadStoreContext must be used within UserStoreProvider`)
  }

  return useStore(threadStoreContext, selector)
}
