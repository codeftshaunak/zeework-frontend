import { AxiosError, AxiosRequestConfig, Method } from "axios";
import { handleApiError } from "./common";
import { API } from "./proxy";

interface ApiRequestOptions {
  endpoint: string;
  method?: Method;
  data?: any;
  authToken?: string | null;
  customHeaders?: Record<string, string>;
}

export const apiRequest = async <T = any>({
  endpoint,
  method = "GET",
  data,
  authToken,
  customHeaders = {},
}: ApiRequestOptions): Promise<T> => {
  const headers: Record<string, string> = {
    ...(authToken ? { token: authToken } : {}),
    ...customHeaders,
  };

  // Set content type automatically
  if (data instanceof FormData) {
    headers["Content-Type"] = "multipart/form-data";
  } else {
    headers["Content-Type"] = "application/json";
  }

  const config: AxiosRequestConfig = {
    method,
    url: endpoint,
    data,
    headers,
  };

  try {
    const response = await API.request<T>(config);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    const handled = handleApiError(err);
    throw handled; // rethrow so caller knows it's an error
  }
};
