import { handleApiError } from "./common";
import { API } from "./proxy";

  const headers = {
    ...customHeaders,
    token: authtoken,
    "Content-Type": contentType,
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
    // const { handleApiError } = useApiErrorHandling();
    const { path, message, isError, response } = handleApiError(error);

    return { path, message, isError, msg: response?.data?.msg };
  }
};

export 
export 
export 
export 
export 