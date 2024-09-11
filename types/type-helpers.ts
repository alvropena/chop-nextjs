//Converts an Interface to a Type, can be used to visualize what's inside any Interface

export type ExtractProperties<T> = {
  [K in keyof T]: T[K];
};
