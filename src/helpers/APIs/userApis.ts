import { handleApiError } from "./common";
import { API } from "./proxy";

const makeApiRequest = async (method, endpoint, data = null, customHeaders={}) => {
  const authtoken = localStorage.getItem("authtoken");

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

export const updateFreelancerProfile = async (data) =>
  makeApiRequest("post", "/profile-details", data);

export const uploadImage = async (data) =>
  makeApiRequest("post", "/user-profile-image", data);

export const updateFreelancer = async (data) => {
  return makeApiRequest("PUT", "/edit-profile", data);
};

export const getAllDetailsOfUser = async () =>
  makeApiRequest("get", "/user/profile");

export const forgetLoginPassword = async (data) =>
  makeApiRequest("post", "/forgot-password", data);

export const changeOldPassword = async (body) =>
  makeApiRequest("post", "/reset-password", body);

export const getTaskDetails = async (offer_id) =>
  makeApiRequest("get", `/task?contract_ref=${offer_id}`);

export const getNotifications = async (profile) =>
  makeApiRequest("get", "/notifications", null, { profile: profile });

export const readAsNotification = async (body) =>
  makeApiRequest("patch", "/notification/read", body);

export const githubAccessToken = async (body) =>
  makeApiRequest("post", "/github/access_token", body);

export const getGithubProfile = async (body) =>
  makeApiRequest("post", "/github/profile", body);

export const stackOverflowAccessToken = async (body) =>
  makeApiRequest("post", "/stackoverflow/access_token", body);

export const getStackOverflowProfile = async (body) =>
  makeApiRequest("post", "/stackoverflow/profile", body);
