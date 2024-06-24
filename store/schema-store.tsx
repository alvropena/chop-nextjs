import { createStore } from "zustand/vanilla";

export type SchemaState = {
  schema: {};
};

export type SchemaActions = {
  setSchema: (SchemaInfo: Partial<SchemaState>) => void;
  clearSchema: () => void;
};

export type SchemaStore = SchemaState & SchemaActions;

export const defaultInitState: SchemaState = {
  schema: {},
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
  }));
};
