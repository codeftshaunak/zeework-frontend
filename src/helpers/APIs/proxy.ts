import axios from "axios";

// Local URL
// export const BASE_URL = `http://localhost:5002/api/v1`;
// export const socketURL = "http://localhost:5002/";

// Live Backend URL
export const socketURL = process.env.NEXT_PUBLIC_SOCKET_URL;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const authToken = localStorage.getItem("authtoken");

export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    token: authToken,
  },
});

export const useApiErrorHandling = () => {
  const logoutAndRedirect = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authtoken");
    window.location.replace("/login");
  };

  const handleErrorResponse = (msg) => {
    return {
      message: msg,
      isError: true,
    };
  };

  const handleApiError = (error) => {
    if (error?.response) {
      console.log("Error response:", error.response);
      if (error.response?.data?.code === 401) {
        return logoutAndRedirect();
      } else if (error.response?.data?.code === 400) {
        return handleErrorResponse(error.response?.data?.msg);
      } else if (error.response?.data?.code === 404) {
        return handleErrorResponse(error.response?.data?.msg);
      } else {
        throw error;
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("Network error: Unable to connect to the server.");
    } else {
      console.error("Request setup Error:", error.message);
      throw new Error("Unexpected error occurred.");
    }
  };

  API.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("Interceptor error:", error);
      if (error?.response?.status === 401) {
        logoutAndRedirect();
      }
      return Promise.reject(handleApiError(error));
    }
  );
};
