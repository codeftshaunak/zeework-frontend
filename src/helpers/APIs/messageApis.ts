import { AxiosRequestConfig, Method } from "axios";
import { handleApiError } from "./common";
import { API } from "./proxy";

interface ApiRequestOptions<T = any> {
  method: Method;
  endpoint: string;
  data?: T;
  customHeaders?: Record<string, string>;
  contentType?: string;
}

interface ApiError {
  path?: string;
  message: string;
  isError: boolean;
}

const makeApiRequest = async <TResponse = any, TData = any>({
  method,
  endpoint,
  data = null,
  customHeaders = {},
  contentType = "application/json",
}: ApiRequestOptions<TData>): Promise<TResponse | ApiError> => {
  const authToken =
    typeof window !== "undefined" ? localStorage.getItem("authtoken") : null;

  const headers: Record<string, string> = {
    "Content-Type": contentType,
    ...(authToken ? { token: authToken } : {}),
    ...customHeaders,
  };

  const config: AxiosRequestConfig<TData> = {
    method,
    url: endpoint,
    headers,
    data,
  };

  try {
    const response = await API.request<TResponse>(config);
    return response.data;
  } catch (error) {
    const handledError = handleApiError(error);
    return handledError;
  }
};

// -------------------- Messaging APIs --------------------

export const getMessageUsers = async (profile?: string) =>
  makeApiRequest({
    method: "get",
    endpoint: `/user-chat-list${profile ? `?profile=${profile}` : ""}`,
  });

export const getMessageDetails = async (
  receiverId: string | number,
  contractRef?: string | number,
  profile?: string
) =>
  makeApiRequest({
    method: "get",
    endpoint: `/message-list?receiver_id=${receiverId}${
      contractRef ? `&contract_ref=${contractRef}` : ""
    }`,
    customHeaders: profile ? { profile } : {},
  });

export const deleteSingleMessage = async (body: Record<string, any>) =>
  makeApiRequest({
    method: "post",
    endpoint: `/message/delete`,
    data: body,
  });
