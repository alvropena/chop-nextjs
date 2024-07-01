import { Prompt, Prompts, Thread, Question, Option } from "@/types/prompt";
import { createStore } from "zustand/vanilla";

export type ThreadState = {
  currentPrompt?: Prompt;
  threads: Prompts[];
};

export type ThreadActions = {
  addThread: (newThread: Prompts) => void;
  setThread: (updatedThread: Prompts) => void;
  setThreads: (newThreads: Prompts[]) => void;
  clearThreads: () => void;
  setCurrentPrompt: (newPrompt: Prompt) => void;
  clearCurrentPrompt: () => void;
  resetStore: () => void;
};

export type ThreadStore = ThreadState & ThreadActions;

export const defaultInitState: ThreadState = {
  currentPrompt: undefined,
  threads: [],
};

export const createThreadStore = (
  initState: ThreadState = defaultInitState
) => {
  return createStore<ThreadStore>((set) => ({
    ...initState,
    addThread: (newThread) =>
      set((state) => ({
        threads: [...state.threads, newThread],
      })),
    setThread: (updatedThread) =>
      set((state) => ({
        threads: state.threads.map((thread) =>
          thread.id === updatedThread.id ? updatedThread : thread
        ),
      })),
    setThreads: (newThreads) => set({ threads: newThreads }),
    clearThreads: () => set({ threads: [] }),
    setCurrentPrompt: (newPrompt) => set({ currentPrompt: newPrompt }),
    clearCurrentPrompt: () => set({ currentPrompt: undefined }),
    resetStore: () => set(defaultInitState),
  }));
};
