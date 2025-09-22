import axios, { AxiosError, AxiosResponse } from "axios";

// Local URL (uncomment for local development)
// export const BASE_URL = `http://localhost:5002/api/v1`;
// export const socketURL = "http://localhost:5002/";

// Live Backend URL
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

// Get token from localStorage if available
const authToken =
  typeof window !== "undefined" ? localStorage.getItem("authtoken") : null;

// Axios instance
export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    ...(authToken ? { token: authToken } : {}),
  },
});

/**
 * Logout and redirect user
 */
export const logoutAndRedirect = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authtoken");
    window.location.replace("/login");
  }
};

/**
 * Handle structured API error responses
 */
export const handleApiError = (
  error: AxiosError
): { path?: string; message: string; isError: boolean } => {
  if (error?.response) {
    console.error("Error response:", error.response);

    const code = (error.response.data as any)?.code;
    const msg = (error.response.data as any)?.msg;

    if (code === 401) {
      logoutAndRedirect();
      return { message: "Unauthorized access", isError: true };
    } else if (code === 400 || code === 404) {
      return { message: msg || "Bad request", isError: true };
    } else {
      throw error;
    }
  } else if (error.request) {
    console.error("No response received:", error.request);
    return {
      message: "Network error: Unable to connect to the server.",
      isError: true,
    };
  } else {
    console.error("Request setup Error:", error.message);
    return { message: "Unexpected error occurred.", isError: true };
  }
};

// Attach interceptor to catch 401 and redirect
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
