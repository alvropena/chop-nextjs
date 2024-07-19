'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type SchemaStore, createSchemaStore } from '../store/schema-store'
export type SchemaStoreApi = ReturnType<typeof createSchemaStore>

export const SchemaStoreContext = createContext<SchemaStoreApi | undefined>(
  undefined
)

export interface SchemaStoreProviderProps {
  children: ReactNode
}

export const SchemaStoreProvider = ({ children }: SchemaStoreProviderProps) => {
  const storeRef = useRef<SchemaStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createSchemaStore()
  }

  return (
    <SchemaStoreContext.Provider value={storeRef.current}>
      {children}
    </SchemaStoreContext.Provider>
  )
}

export const useSchemaStore = <T,>(selector: (store: SchemaStore) => T): T => {
  const schemaStoreContext = useContext(SchemaStoreContext)

  if (!schemaStoreContext) {
    throw new Error(
      `schemaStoreContext must be used within SchemaStoreProvider`
    )
  }

  return useStore(schemaStoreContext, selector)
}
