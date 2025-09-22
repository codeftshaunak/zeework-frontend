// Re-export from common
export { makeApiRequest } from "./common";

// Re-export from other API modules (example)
// export { getUserProfile, updateUserProfile } from "./userApi";
// export { getProjects, createProject } from "./projectApi";

// Utility functions
export const isSuccessfulResponse = (response: { code: number }): boolean => {
  return response.code >= 200 && response.code < 300;
};

export const getErrorMessage = (response: {
  msg?: string;
  error?: string;
}): string => {
  return response.msg || response.error || "An unknown error occurred";
};

// Common types
export interface ApiResponse<T = any> {
  code: number;
  msg?: string;
  body?: T;
  error?: string;
}

export interface ApiRequestParams {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: any;
  headers?: Record<string, string>;
  auth?: boolean;
}
