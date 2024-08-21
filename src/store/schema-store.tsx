import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";

type searchType = {
  id: number;
  username: string;
  name: string;
  profile_picture: string;
  verified?: boolean;
};

export type SchemaState = {
  schema: {};
  lang: "en" | "es" | "ja" | "ind";
  user_input_generation: string;
  remember_skip: boolean;
  recentSearches: searchType[] | [];
};

export type SchemaActions = {
  setSchema: (SchemaInfo: Partial<SchemaState>) => void;
  clearSchema: () => void;
  setLang: (lang: "en" | "es" | "ja" | "ind") => void;
  resetLang: () => void;
  setUserInput: (user_input_generation: string) => void;
  setRememberSkip: (skip: boolean) => void;
  setRecentSearches: (recentSearches: searchType[]) => void;
  addRecentSearch: (recentSearch: searchType) => void;
};

export type SchemaStore = SchemaState & SchemaActions;

export const defaultInitState: SchemaState = {
  schema: {},
  lang: "en",
  user_input_generation:
    "Generate a question based on the following statement, as if it were a question for an exam. Do not include the answer in the question.",
  remember_skip: false,
  recentSearches: [],
};

export const createSchemaStore = (
  initState: SchemaState = defaultInitState
) => {
  return createStore<SchemaStore>()(
    persist(
      (set) => ({
        ...initState,
        setSchema: (schemaInfo) =>
          set((state) => ({
            schema: { ...state.schema, ...schemaInfo },
          })),
        clearSchema: () => set(() => ({ schema: defaultInitState.schema })),
        setLang: (lang) => set(() => ({ lang })),
        setUserInput: (user_input_generation) =>
          set(() => ({ user_input_generation })),
        resetLang: () => set(() => ({ lang: defaultInitState.lang })),
        setRememberSkip: (skip: boolean) =>
          set(() => ({ remember_skip: skip })),
        setRecentSearches: (recentSearches) => set(() => ({ recentSearches })),
        addRecentSearch: (recentSearch) =>
          set((state) => {
            const existingIndex = state.recentSearches.findIndex(
              (search) => search.id === recentSearch.id
            );

            if (existingIndex !== -1) {
              // Remove the existing item
              const updatedSearches = [...state.recentSearches];
              updatedSearches.splice(existingIndex, 1);

              // Add it to the front
              return {
                recentSearches: [recentSearch, ...updatedSearches],
              };
            } else {
              // Add new item to the front
              return {
                recentSearches: [recentSearch, ...state.recentSearches],
              };
            }
          }),
      }),
      {
        name: "schema",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
};
