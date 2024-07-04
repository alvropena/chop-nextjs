'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type PromptStore, createPromptStore } from '../store/prompt-store'
export type PromptStoreApi = ReturnType<typeof createPromptStore>

export const PromptStoreContext = createContext<PromptStoreApi | undefined>(
  undefined
)

export interface PromptStoreProviderProps {
  children: ReactNode
}

export const PromptStoreProvider = ({ children }: PromptStoreProviderProps) => {
  const storeRef = useRef<PromptStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createPromptStore()
  }

  return (
    <PromptStoreContext.Provider value={storeRef.current}>
      {children}
    </PromptStoreContext.Provider>
  )
}

export const usePromptStore = <T,>(selector: (store: PromptStore) => T): T => {
  const promptStoreContext = useContext(PromptStoreContext)

  if (!promptStoreContext) {
    throw new Error(`promptStoreContext must be used within UserStoreProvider`)
  }

  return useStore(promptStoreContext, selector)
}
