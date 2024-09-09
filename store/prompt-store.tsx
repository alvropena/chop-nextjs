import { createStore } from "zustand/vanilla";

export type PromptState = {
  Prompt: {};
};

export type PromptActions = {
  setPrompt: (PromptInfo: Partial<PromptState>) => void;
  clearPrompt: () => void;
};

export type PromptStore = PromptState & PromptActions;

export const defaultInitState: PromptState = {
  Prompt: {},
};

export const createPromptStore = (
  initState: PromptState = defaultInitState
) => {
  return createStore<PromptStore>()((set) => ({
    ...initState,
    setPrompt: (PromptInfo) =>
      set((state) => ({ Prompt: { ...state.Prompt, ...PromptInfo } })),
    clearPrompt: () => set((state) => ({ Prompt: defaultInitState.Prompt })),
  }));
};
