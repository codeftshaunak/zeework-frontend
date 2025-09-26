import { API } from "./proxy";

const logoutAndRedirect = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("authtoken");

  window.location.replace("/login");

  return {
    path: "/login",
    message: "Authentication Error",
    isError: true,
  };
};

const handleErrorResponse = (msg) => {
  return {
    message: msg,
    isError: true,
  };
};

export const handleApiError = (error) => {
  if (error?.response) {
    if (error.response?.data?.code == 401) {
      return logoutAndRedirect();
    } else if (error.response?.data?.code == 400) {
      return handleErrorResponse(error.response?.data?.msg);
    } else if (error.response?.data?.code == 404) {
      return handleErrorResponse(error.response?.data?.msg);
    } else {
      return error;
    }
  } else if (error.request) {
    console.error("No response received:", error.request);
    throw new Error("Network error: Unable to connect to the server.");
  } else {
    console.error("Request setup Error:", error.message);
    throw new Error("Unexpected error occurred.");
  }
};

/**
 *
 * @param {'post' | 'get' | 'put' | 'delete'} method
 * @param {string} endpoint
 * @param {null | any} data
 * @param {Headers} customHeaders
 * @param {"application/json" | "multipart/form-data"} contentType
 * @returns
 */
export const makeApiRequest = async (
  method,
  endpoint,
  data = null,
  customHeaders = {},
  contentType = "application/json"
) => {
  const authtoken = localStorage.getItem("authtoken");

  const headers = {
    "Content-Type": contentType,
    token: authtoken,
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
    // Use the error handling hook
    const { path, message, isError } = handleApiError(error);
    return { path, message, isError };
  }
};
