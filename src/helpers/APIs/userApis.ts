import { AxiosRequestConfig, Method } from "axios";
import { handleApiError } from "./common";
import { API } from "./proxy";

// Generic API request function
interface MakeApiRequestOptions<T = any> {
  method: Method;
  endpoint: string;
  data?: T;
  customHeaders?: Record<string, string>;
}

const makeApiRequest = async <TResponse = any, TData = any>({
  method,
  endpoint,
  data = null,
  customHeaders = {},
}: MakeApiRequestOptions<TData>): Promise<TResponse> => {
  const authToken =
    typeof window !== "undefined" ? localStorage.getItem("authtoken") : null;

  const headers: Record<string, string> = {
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...customHeaders,
  };

  // Set content type
  if (data instanceof FormData) {
    headers["Content-Type"] = "multipart/form-data";
  } else if (!headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const config: AxiosRequestConfig<TData> = {
    method,
    url: endpoint,
    data,
    headers,
  };

  try {
    const response = await API.request<TResponse>(config);
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error);
  }
};

// ---------------- API ENDPOINT FUNCTIONS ----------------

export const updateFreelancerProfile = <T = any>(data: T) =>
  makeApiRequest({ method: "POST", endpoint: "/profile-details", data });

export const uploadImage = <T = any>(data: T) =>
  makeApiRequest({ method: "POST", endpoint: "/user-profile-image", data });

export const updateFreelancer = <T = any>(data: T) =>
  makeApiRequest({ method: "PUT", endpoint: "/edit-profile", data });

export const getAllDetailsOfUser = <T = any>() =>
  makeApiRequest<T>({ method: "GET", endpoint: "/user/profile" });

export const forgetLoginPassword = <T = any>(data: T) =>
  makeApiRequest({ method: "POST", endpoint: "/forgot-password", data });

export const changeOldPassword = <T = any>(body: T) =>
  makeApiRequest({ method: "POST", endpoint: "/reset-password", data: body });

export const getTaskDetails = <T = any>(offer_id: string | number) =>
  makeApiRequest<T>({
    method: "GET",
    endpoint: `/task?contract_ref=${offer_id}`,
  });

export const getNotifications = <T = any>(profile: string) =>
  makeApiRequest<T>({
    method: "GET",
    endpoint: "/notifications",
    customHeaders: { profile },
  });

export const readAsNotification = <T = any>(body: T) =>
  makeApiRequest({
    method: "PATCH",
    endpoint: "/notification/read",
    data: body,
  });

export const githubAccessToken = <T = any>(body: T) =>
  makeApiRequest({
    method: "POST",
    endpoint: "/github/access_token",
    data: body,
  });

export const getGithubProfile = <T = any>(body: T) =>
  makeApiRequest({ method: "POST", endpoint: "/github/profile", data: body });

export const stackOverflowAccessToken = <T = any>(body: T) =>
  makeApiRequest({
    method: "POST",
    endpoint: "/stackoverflow/access_token",
    data: body,
  });

export const getStackOverflowProfile = <T = any>(body: T) =>
  makeApiRequest({
    method: "POST",
    endpoint: "/stackoverflow/profile",
    data: body,
  });
