// api.ts
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { BASE_URL } from "./proxy";
import { handleApiError } from "./common";

// Create axios instance
const API: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Request headers helper
const getHeaders = (
  authToken?: string,
  contentType: string = "application/json"
) => ({
  headers: {
    "Content-Type": contentType,
    ...(authToken ? { token: authToken } : {}),
  },
});

// Centralized error handler
const handleError = (error: AxiosError) => {
  handleApiError(error);
  return error.response?.data;
};

// Example: Fetch user profile
export const fetchUserProfile = async (authToken: string) => {
  try {
    const response: AxiosResponse<{ body: any }> = await API.get(
      "/user/profile",
      getHeaders(authToken)
    );
    return response.data.body;
  } catch (error) {
    return handleError(error as AxiosError);
  }
};

// Example: Job search with filters
interface JobSearchParams {
  page?: number;
  searchTerm?: string;
  experience?: string[];
  contractType?: string[];
  hourlyRateMin?: number;
  hourlyRateMax?: number;
  fixedRateMin?: number;
  fixedRateMax?: number;
  category?: { value: string }[];
  payment?: string;
}

export const searchJobs = async ({
  page,
  searchTerm,
  experience,
  contractType,
  hourlyRateMin,
  hourlyRateMax,
  fixedRateMin,
  fixedRateMax,
  category,
  payment,
}: JobSearchParams) => {
  try {
    const response: AxiosResponse<{ body: any }> = await API.get(
      "/job/search",
      {
        headers: { "Content-Type": "application/json" },
        params: {
          page: page || 1,
          searchTerm: searchTerm || null,
          experience: experience?.join(",") || null,
          job_type: contractType?.join(",") || null,
          hourly_rate_min: hourlyRateMin || null,
          hourly_rate_max: hourlyRateMax || null,
          fixed_rate_min: fixedRateMin || null,
          fixed_rate_max: fixedRateMax || null,
          category: category?.map((cat) => cat.value).join(",") || null,
          payment: payment || null,
        },
      }
    );

    return response.data.body;
  } catch (error) {
    console.error("Error fetching job data:", error);
    throw error;
  }
};

// Example: Generic POST request
export const postData = async <T = any>(
  url: string,
  data: any,
  authToken?: string
) => {
  try {
    const response: AxiosResponse<T> = await API.post(
      url,
      data,
      getHeaders(authToken)
    );
    return response.data;
  } catch (error) {
    return handleError(error as AxiosError);
  }
};

// Example: Generic GET request
export const getData = async <T = any>(url: string, authToken?: string) => {
  try {
    const response: AxiosResponse<T> = await API.get(
      url,
      getHeaders(authToken)
    );
    return response.data;
  } catch (error) {
    return handleError(error as AxiosError);
  }
};
