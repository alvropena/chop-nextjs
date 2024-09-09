'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
  type QuestionStore,
  createQuestionStore
} from '../store/question-store'
export type QuestionStoreApi = ReturnType<typeof createQuestionStore>

export const QuestionStoreContext = createContext<QuestionStoreApi | undefined>(
  undefined
)

export interface QuestionStoreProviderProps {
  children: ReactNode
}

export const QuestionStoreProvider = ({
  children
}: QuestionStoreProviderProps) => {
  const storeRef = useRef<QuestionStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createQuestionStore()
  }

  return (
    <QuestionStoreContext.Provider value={storeRef.current}>
      {children}
    </QuestionStoreContext.Provider>
  )
}

export const useQuestionStore = <T,>(
  selector: (store: QuestionStore) => T
): T => {
  const questionStoreContext = useContext(QuestionStoreContext)

  if (!questionStoreContext) {
    throw new Error(
      `questionStoreContext must be used within UserStoreProvider`
    )
  }

  return useStore(questionStoreContext, selector)
}
