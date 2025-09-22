import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

// Next.js environment variables
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
export const socketURL = process.env.NEXT_PUBLIC_SOCKET_URL as string;

/** Get auth token from localStorage (client-side only) */
const getAuthToken = (): string | null =>
  typeof window !== "undefined" ? localStorage.getItem("authtoken") : null;

/** Axios instance */
export const API: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    ...(getAuthToken() ? { token: getAuthToken() } : {}),
  },
});

interface ApiError {
  message: string;
  isError: boolean;
  path?: string;
}

/** Logout and redirect to login */
export const logoutAndRedirect = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
    localStorage.removeItem("authtoken");
    window.location.replace("/login");
  }
};

/** Handle structured API error responses */
export const handleApiError = (error: AxiosError): ApiError => {
  if (error.response) {
    console.error("Error response:", error.response);

    const code = (error.response.data as any)?.code;
    const msg = (error.response.data as any)?.msg;

    if (code === 401) {
      logoutAndRedirect();
      return { message: "Unauthorized access", isError: true };
    } else if (code === 400 || code === 404) {
      return { message: msg || "Bad request", isError: true };
    } else {
      throw error; // unexpected error, let caller handle
    }
  } else if (error.request) {
    console.error("No response received:", error.request);
    return {
      message: "Network error: Unable to connect to the server.",
      isError: true,
    };
  } else {
    console.error("Request setup error:", error.message);
    return { message: "Unexpected error occurred.", isError: true };
  }
};

/** Hook to attach Axios interceptor for handling 401 */
export const useApiErrorHandling = (): void => {
  API.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      console.error("Interceptor error:", error);
      if (error?.response?.status === 401) {
        logoutAndRedirect();
      }
      return Promise.reject(handleApiError(error));
    }
  );
};
