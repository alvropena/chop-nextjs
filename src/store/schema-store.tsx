import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";

export type SchemaState = {
  schema: {};
  lang: "en" | "es";
  user_input_generation: string;
};

export type SchemaActions = {
  setSchema: (SchemaInfo: Partial<SchemaState>) => void;
  clearSchema: () => void;
  setLang: (lang: "en" | "es") => void;
  resetLang: () => void;
  setUserInput: (user_input_generation: string) => void;
};

export type SchemaStore = SchemaState & SchemaActions;

export const defaultInitState: SchemaState = {
  schema: {},
  lang: "en",
  user_input_generation:
    "Generate a question based on the following statement, as if it were a question for an exam. Do not include the answer in the question.",
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
        clearSchema: () =>
          set((state) => ({ schema: defaultInitState.schema })),
        setLang: (lang) => set(() => ({ lang })),
        setUserInput: (user_input_generation) =>
          set(() => ({ user_input_generation })),
        resetLang: () => set(() => ({ lang: defaultInitState.lang })),
      }),
      {
        name: "schema-user", // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      }
    )
  );
};
