import { handleApiError } from "./common";
import { API } from "./proxy";

  const headers = {
    token: authtoken,
    ...customHeaders,
  };

  if (!(data instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  } else {
    headers["Content-Type"] = "multipart/form-data";
  }

  const config = {
    method,
    url: endpoint,
    data,
    headers,
  };

  try {
    const response = await API(config);
    return response.data;
  } catch (error) {
    // Use the error handling hook
    // const { handleApiError } = useApiErrorHandling();
    handleApiError(error);
    return error.response.data;
  }
};




};










export;

// Placeholder exports to fix build
export const placeholder = true;