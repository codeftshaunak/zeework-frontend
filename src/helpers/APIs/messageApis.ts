import { handleApiError } from "./common";
import { API } from "./proxy";

const makeApiRequest = async (
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
    // const { handleApiError } = useApiErrorHandling();
    const { path, message, isError } = handleApiError(error);
    return { path, message, isError };
  }
};

export const getMessageUsers = async (profile) =>
  makeApiRequest(
    "get",
    `/user-chat-list${profile ? `?profile=${profile}` : ""}`
  );

export const getMessageDetails = async (receiverId, contractRef, profile) =>
  makeApiRequest(
    "get",
    `/message-list?receiver_id=${receiverId}${
      contractRef ? `&contract_ref=${contractRef}` : ""
    }`,
    null,
    { profile: profile }
  );

export const deleteSingleMessage = async (body) =>
  makeApiRequest("post", `/message/delete`, body);
