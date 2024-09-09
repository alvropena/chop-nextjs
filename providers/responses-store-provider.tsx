'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
  type ResponsesStore,
  createResponsesStore
} from '../store/responses-store'
export type ResponsesStoreApi = ReturnType<typeof createResponsesStore>

export const ResponsesStoreContext = createContext<
  ResponsesStoreApi | undefined
>(undefined)

export interface ResponsesStoreProviderProps {
  children: ReactNode
}

export const ResponsesStoreProvider = ({
  children
}: ResponsesStoreProviderProps) => {
  const storeRef = useRef<ResponsesStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createResponsesStore()
  }

  return (
    <ResponsesStoreContext.Provider value={storeRef.current}>
      {children}
    </ResponsesStoreContext.Provider>
  )
}

export const useResponsesStore = <T,>(
  selector: (store: ResponsesStore) => T
): T => {
  const responsesStoreContext = useContext(ResponsesStoreContext)

  if (!responsesStoreContext) {
    throw new Error(
      `responsesStoreContext must be used within UserStoreProvider`
    )
  }

  return useStore(responsesStoreContext, selector)
}
