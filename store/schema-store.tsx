import { createStore } from "zustand/vanilla";

export type SchemaState = {
  schema: {};
  lang: "en-US" | "es-MX";
};

export type SchemaActions = {
  setSchema: (SchemaInfo: Partial<SchemaState>) => void;
  clearSchema: () => void;
  setLang: (lang: "en-US" | "es-MX") => void;
  resetLang: () => void;
};

export type SchemaStore = SchemaState & SchemaActions;

export const defaultInitState: SchemaState = {
  schema: {},
  lang: "en-US",
};

export const createSchemaStore = (
  initState: SchemaState = defaultInitState
) => {
  return createStore<SchemaStore>()((set) => ({
    ...initState,
    setSchema: (schemaInfo) =>
      set((state) => ({
        schema: { ...state.schema, ...schemaInfo },
      })),
    clearSchema: () => set((state) => ({ schema: defaultInitState.schema })),
    setLang: (lang) => set(() => ({ lang })),
    resetLang: () => set(() => ({ lang: defaultInitState.lang })),
  }));
};
