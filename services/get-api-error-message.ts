import type { ApiErrorDto } from "../types/api-error-type";

export const getApiErrorMessage = (err: Error) => {
  return (err as unknown as ApiErrorDto)?.response?.data?.message;
};
