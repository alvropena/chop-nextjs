import { create } from "zustand";

interface CardState {
  isCorrect: boolean | null;
  showFeedback: boolean;
  currentCardIndex: number;
  setIsCorrect: (isCorrect: boolean | null) => void;
  setShowFeedback: (showFeedback: boolean) => void;
  handlePreviousCard: () => void;
  handleNextCard: (cardsNumber: number) => void;
}

export const useCardStore = create<CardState>()((set) => ({
  isCorrect: null,
  showFeedback: false,
  currentCardIndex: 0,
  setIsCorrect: (isCorrect) => set({ isCorrect }),
  setShowFeedback: (showFeedback) => set({ showFeedback }),
  handlePreviousCard: () =>
    set(({ currentCardIndex }) => ({
      currentCardIndex:
        currentCardIndex > 0 ? currentCardIndex - 1 : currentCardIndex,
    })),
  handleNextCard: (cardsNumber) =>
    set(({ currentCardIndex }) => ({
      currentCardIndex:
        currentCardIndex < cardsNumber - 1
          ? currentCardIndex + 1
          : currentCardIndex,
    })),
}));
