import axios from "axios";
import { handleApiError } from "./common";
import { BASE_URL } from "./proxy";

export const API = axios.create({
  baseURL: BASE_URL,
});

export const getClientJobs = async () => {
  try {
    const authtoken = localStorage.getItem("authtoken");
    const response = await API.get("/job/client/jobs", {
      headers: {
        "Content-Type": "application/json",
        token: `${authtoken}`,
      },
    });
    return response.data.body;
  } catch (error) {
    return error;
  }
};

export const deleteJob = async (data) => {
  try {
    const authtoken = localStorage.getItem("authtoken");
    const response = await API.post(`job/delete/${data}`, {
      headers: {
        "Content-Type": "application/json",
        token: `${authtoken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const makeApiRequest = async (
  method,
  endpoint,
  data = null,
  customHeaders = {},
  params = {}
) => {
  const authtoken = localStorage.getItem("authtoken");

  const headers = {
    "Content-Type": "application/json",
    token: authtoken,
    ...customHeaders,
  };

  const config = {
    method,
    url: endpoint,
    headers,
    data,
    params, // Include query parameters
  };

  try {
    const response = await API(config);
    return response?.data;
  } catch (error) {
    // Handle error appropriately
    console.error("API Error:", error);
    handleApiError(error);
    return error; // Rethrow error to handle it where makeApiRequest is called
  }
};

export const getProposals = async (data) =>
  makeApiRequest("get", `/job/${data}/proposal`);

export const inviteToJob = async (data) =>
  makeApiRequest("post", "/invitation-send");

export const giveFeedback = async (data) =>
  makeApiRequest("post", "/feedback/add", data);

export const getHiredListByClient = async () =>
  makeApiRequest("get", "/client/all-hired");

export const getOptionsList = async () =>
  makeApiRequest("get", "/getOptionsList");

export const sendHireFreelancer = async (data, id) =>
  makeApiRequest("post", `/offer/send?offer_to=${id}`, data);

export const getClientById = async (id) =>
  makeApiRequest("get", `/user?client_id=${id}`);

export const resendEmailVerification = async (email) =>
  makeApiRequest("post", "/email/resend-verification", email);

export const getCommonJobGigs = async () =>
  makeApiRequest("get", "/common/job/gig");

export const sendGigPurchasesReq = async (data) =>
  makeApiRequest("post", "/gig/purchase", data);

export const getGigPurchasesReq = async () =>
  makeApiRequest("get", "/gig/purchase/list");

export const getClientReport = async () =>
  makeApiRequest("get", "/report/client");

export const getClientContract = async () =>
  makeApiRequest("get", "/contract/client");

export const getCompletedJobs = async () =>
  makeApiRequest("get", "/jobs/completed");

export const updateClientProfile = async (data) =>
  makeApiRequest("put", "/edit-profile", data);

export const sendJobInvitation = async (data) =>
  makeApiRequest("post", "/invitation-send", data);
