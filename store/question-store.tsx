import { createStore } from "zustand/vanilla";

export type QuestionState = {
  question: {};
};

export type QuestionActions = {
  setQuestion: (questionInfo: Partial<QuestionState>) => void;
  clearQuestion: () => void;
};

export type QuestionStore = QuestionState & QuestionActions;

export const defaultInitState: QuestionState = {
  question: {},
};

export const createQuestionStore = (
  initState: QuestionState = defaultInitState
) => {
  return createStore<QuestionStore>()((set) => ({
    ...initState,
    setQuestion: (questionInfo) =>
      set((state) => ({ question: { ...state.question, ...questionInfo } })),
    clearQuestion: () =>
      set((state) => ({ question: defaultInitState.question })),
  }));
};
