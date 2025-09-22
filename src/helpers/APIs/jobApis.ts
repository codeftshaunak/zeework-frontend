import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "./proxy";
import { handleApiError } from "./common";

const API = axios.create({
  baseURL: BASE_URL,
});

const getAuthToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("authtoken") : null;

const setAuthHeaders = (contentType = "application/json") => {
  const authToken = getAuthToken();
  return {
    headers: {
      "Content-Type": contentType,
      ...(authToken ? { token: authToken } : {}),
    },
  };
};

const handleError = (error: any) => {
  handleApiError(error);
  return error.response?.data;
};

// Generic function for GET requests
const apiGet = async <T = any>(
  endpoint: string,
  config?: AxiosRequestConfig
) => {
  try {
    const response = await API.get<T>(endpoint, config || setAuthHeaders());
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Generic function for POST requests
const apiPost = async <T = any, U = any>(
  endpoint: string,
  data: U,
  config?: AxiosRequestConfig
) => {
  try {
    const response = await API.post<T>(
      endpoint,
      data,
      config || setAuthHeaders()
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Generic function for PATCH requests
const apiPatch = async <T = any, U = any>(
  endpoint: string,
  data: U,
  config?: AxiosRequestConfig
) => {
  try {
    const response = await API.patch<T>(
      endpoint,
      data,
      config || setAuthHeaders()
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Generic function for DELETE requests
const apiDelete = async <T = any, U = any>(
  endpoint: string,
  data?: U,
  config?: AxiosRequestConfig
) => {
  try {
    const response = await API.delete<T>(endpoint, {
      data,
      ...config,
      headers: {
        "Content-Type": "application/json",
        ...setAuthHeaders().headers,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// -------------------- Job APIs --------------------

export const getAllJobs = () => apiGet("/job/get-all");
export const getJobs = (params: Record<string, any>) =>
  apiGet("/job/search", { params, headers: setAuthHeaders().headers });

export const getInvitedFreelancer = () => apiGet("/freelancers/invited");
export const applyJob = (data: any) => apiPost("/job/apply", data);
export const createJob = (formData: FormData) =>
  apiPost("/job/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...setAuthHeaders().headers,
    },
  });
export const getAllJobsProposal = () => apiGet("/jobs/proposals");
export const userAllJobs = () => apiGet("/user/jobs");
export const getSingleJobDetails = (id: string | number) =>
  apiGet(`/job/get-job?job_id=${id}`);
export const getAgencyAllJobs = () => apiGet("/agency/jobs");

export const updateJob = (id: string | number, data: FormData) =>
  apiPatch(`/job/update?job_id=${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...setAuthHeaders().headers,
    },
  });

export const deleteJob = (id: string | number) =>
  apiDelete("/job/delete", { job_id: id });
export const endJobContract = (body: any) => apiPost("/contract/end", body);
export const changeOldPassword = (body: any) =>
  apiPost("/reset-password", body);

export const submitTask = (body: FormData) =>
  apiPost("/offer/task/submit", body, setAuthHeaders("multipart/form-data"));

export const taskApproveOrReject = (body: any) =>
  apiPost("/task/approve", body);

export const getTimeSheet = (id: string | number) =>
  apiGet(`timesheet/offer_id?ref=${id}`);

export const getAllTimeSheet = () => apiGet("/timesheet");

export const getAllTimeSheetAgency = () =>
  apiGet("/timesheet", { params: { is_agency: true } });
