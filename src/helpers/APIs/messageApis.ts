import { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { handleApiError } from "./common";
import { API } from "./proxy"; // axios.create({ baseURL: ... })

interface ApiRequestOptions {
  endpoint: string;
  method?: Method;
  data?: any;
  authToken?: string;
  contentType?: string;
  customHeaders?: Record<string, string>;
}

interface ApiErrorResponse {
  path?: string;
  message: string;
  isError: boolean;
}

export const apiRequest = async <T = any>({
  endpoint,
  method = "GET",
  data,
  authToken,
  contentType = "application/json",
  customHeaders = {},
}: ApiRequestOptions): Promise<T | ApiErrorResponse> => {
  const headers = {
    "Content-Type": contentType,
    ...(authToken ? { token: authToken } : {}),
    ...customHeaders,
  };

  const config: AxiosRequestConfig = {
    method,
    url: endpoint,
    headers,
    data,
  };

  try {
    const response: AxiosResponse<T> = await API(config);
    return response.data;
  } catch (error: any) {
    const { path, message, isError } = handleApiError(error);
    return { path, message, isError };
  }
};
