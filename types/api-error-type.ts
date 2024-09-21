//Only valid for error responses in api route handlers
export interface ApiErrorDto {
  response?: {
    data?: {
      message?: string;
      error?: unknown;
    };
  };
}
