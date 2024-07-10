import { Prompt, Prompts, Thread, Question, Option } from "@/types/prompt";
import { createStore } from "zustand/vanilla";

export type ThreadState = {
  currentPrompt?: Prompt;
  threads: Prompts[];
  question_id: Number;
};

export type ThreadActions = {
  addThread: (newThread: Prompts) => void;
  setThread: (updatedThread: Prompts) => void;
  setThreads: (newThreads: Prompts[]) => void;
  clearThreads: () => void;
  setCurrentPrompt: (newPrompt: Prompt) => void;
  clearCurrentPrompt: () => void;
  resetStore: () => void;
  setQuestionId: (id: Number) => void;
  resetQuestion: () => void;
  addOption: (option: Option) => void;
};

export type ThreadStore = ThreadState & ThreadActions;

export const defaultInitState: ThreadState = {
  currentPrompt: undefined,
  threads: [],
  question_id: 0,
};

export const createThreadStore = (
  initState: ThreadState = defaultInitState
) => {
  return createStore<ThreadStore>((set, get) => ({
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
    setQuestionId: (id) => set({ question_id: id }),
    resetQuestion: () => set({ question_id: 0 }),
    addOption: (option) =>
      set((state) => {
        const currentPrompt = state.currentPrompt;
        if (!currentPrompt) {
          console.error("No current prompt selected");
          return state;
        }

        const updatedThreads = state.threads.map((thread) => {
          if (thread.prompt_id === currentPrompt.id) {
            return {
              ...thread,
              question: {
                ...thread.question,
                options: [...thread.question.options, option],
              },
            };
          }
          return thread;
        });

        return { threads: updatedThreads };
      }),
  }));
};
