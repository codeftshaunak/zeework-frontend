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

export const addPaymentMethods = async (body) =>
  makeApiRequest("post", "/payment/save", body);

export const makePayment = async (body) =>
  makeApiRequest("post", "/payment/purchase", body);

export const getPaidFreelancerWithdrawal = async (body) =>
  makeApiRequest("post", "/payment/request", body);

export const getBankDetails = async () =>
  makeApiRequest("get", "/bank-details");

export const deleteBankDetails = async (body) =>
  makeApiRequest("patch", "/delete/bank-details", body);
