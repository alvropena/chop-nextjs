import { createStore } from "zustand/vanilla";

export type ResponsesState = {
  responses: {};
};

export type ResponsesActions = {
  setResponses: (ResponsesInfo: Partial<ResponsesState>) => void;
  clearResponses: () => void;
};

export type ResponsesStore = ResponsesState & ResponsesActions;

export const defaultInitState: ResponsesState = {
  responses: {},
};

export const createResponsesStore = (
  initState: ResponsesState = defaultInitState
) => {
  return createStore<ResponsesStore>()((set) => ({
    ...initState,
    setResponses: (responsesInfo) =>
      set((state) => ({ responses: { ...state.responses, ...responsesInfo } })),
    clearResponses: () =>
      set((state) => ({ responses: defaultInitState.responses })),
  }));
};
