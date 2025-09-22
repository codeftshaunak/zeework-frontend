import { API } from "./proxy";

// Types
interface ErrorResponse {
  path?: string;
  message: string;
  isError: boolean;
}

interface ApiConfig {
  method: "post" | "get" | "put" | "delete" | "patch";
  endpoint: string;
  data?: any;
  customHeaders?: Record<string, string>;
  contentType?: "application/json" | "multipart/form-data";
}

const logoutAndRedirect = (): ErrorResponse => {
  localStorage.removeItem("user");
  localStorage.removeItem("authtoken");

  window.location.replace("/login");

  return {
    path: "/login",
    message: "Authentication Error",
    isError: true,
  };
};

const handleErrorResponse = (msg: string): ErrorResponse => {
  return {
    message: msg,
    isError: true,
  };
};

export const handleApiError = (error: any): ErrorResponse => {
  if (error?.response) {
    if (error.response?.data?.code === 401) {
      return logoutAndRedirect();
    } else if (error.response?.data?.code === 400) {
      return handleErrorResponse(error.response?.data?.msg);
    } else if (error.response?.data?.code === 404) {
      return handleErrorResponse(error.response?.data?.msg);
    } else {
      return handleErrorResponse(
        error.response?.data?.msg || "An unexpected error occurred"
      );
    }
  } else if (error.request) {
    console.error("No response received:", error.request);
    return handleErrorResponse(
      "Network error: Unable to connect to the server."
    );
  } else {
    console.error("Request setup Error:", error.message);
    return handleErrorResponse("Unexpected error occurred.");
  }
};

/**
 * Makes an API request with proper error handling
 * @param {'post' | 'get' | 'put' | 'delete' | 'patch'} method - HTTP method
 * @param {string} endpoint - API endpoint
 * @param {any} data - Request data
 * @param {Record<string, string>} customHeaders - Custom headers
 * @param {"application/json" | "multipart/form-data"} contentType - Content type
 * @returns {Promise<any>} API response
 */
export const makeApiRequest = async ({
  method,
  endpoint,
  data = null,
  customHeaders = {},
  contentType = "application/json",
}: ApiConfig): Promise<any> => {
  const authtoken = localStorage.getItem("authtoken");

  const headers: Record<string, string> = {
    "Content-Type": contentType,
    ...(authtoken && { token: authtoken }),
    ...customHeaders, // Allow for custom headers
  };

  const config = {
    method,
    url: endpoint,
    headers,
    data,
  };

  try {
    const response = await API(config);
    return response.data;
  } catch (error) {
    // Use the error handling function
    const errorResponse = handleApiError(error);

    // If it's an authentication error that triggers redirect, return the error response
    // The redirect will happen in the logoutAndRedirect function
    if (errorResponse.path === "/login") {
      return errorResponse;
    }

    // For other errors, throw or return the error response based on your needs
    // You might want to throw the error instead of returning it depending on your error handling strategy
    return errorResponse;
  }
};

// Utility function for common HTTP methods
export const api = {
  get: (endpoint: string, customHeaders?: Record<string, string>) =>
    makeApiRequest({ method: "get", endpoint, customHeaders }),

  post: (
    endpoint: string,
    data?: any,
    customHeaders?: Record<string, string>,
    contentType?: "application/json" | "multipart/form-data"
  ) =>
    makeApiRequest({
      method: "post",
      endpoint,
      data,
      customHeaders,
      contentType,
    }),

  put: (endpoint: string, data?: any, customHeaders?: Record<string, string>) =>
    makeApiRequest({ method: "put", endpoint, data, customHeaders }),

  delete: (endpoint: string, customHeaders?: Record<string, string>) =>
    makeApiRequest({ method: "delete", endpoint, customHeaders }),

  patch: (
    endpoint: string,
    data?: any,
    customHeaders?: Record<string, string>
  ) => makeApiRequest({ method: "patch", endpoint, data, customHeaders }),
};
