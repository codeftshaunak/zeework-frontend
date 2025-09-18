import axios from "axios";
import { BASE_URL } from "./proxy";
import { handleApiError } from "./common";

const API = axios.create({
  baseURL: BASE_URL,
});

const setAuthHeaders = (contentType = "application/json") => {
  const authToken = localStorage.getItem("authtoken");
  return {
    headers: {
      "Content-Type": contentType,
      token: authToken,
    },
  };
};

const handleError = (error) => {
  handleApiError(error);
  return error.response?.data;
};

export const getAllJobs = async () => {
  try {
    const response = await API.get("/job/get-all", setAuthHeaders());
    return response.data.body;
  } catch (error) {
    return handleError(error);
  }
};

export const getJobs = async (
  page,
  category,
  searchTerm,
  experience,
  contractType,
  hourlyRateMin,
  hourlyRateMax,
  fixedRateMin,
  fixedRateMax,
  payment
) => {
  try {
    // const authtoken = localStorage.getItem("authtoken");
    const experienceValues = experience
      ? experience.map((exp) => exp).join(",")
      : "";
    const contractValue = contractType
      ? contractType.map((contact) => contact).join(",")
      : "";

    const response = await API.get("/job/search", {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        page: page || 1,
        searchTerm: searchTerm || null,
        experience: experienceValues || null,
        job_type: contractValue || null,
        hourly_rate_min: hourlyRateMin || null,
        hourly_rate_max: hourlyRateMax || null,
        fixed_rate_min: fixedRateMin || null,
        fixed_rate_max: fixedRateMax || null,
        category: category ? category.map((cat) => cat.value).join(",") : null,
        payment: payment || null,
      },
    });

    return response.data.body;
  } catch (error) {
    console.error("Error fetching job data:", error);
    throw error;
  }
};

export const getInvitedFreelancer = async () => {
  try {
    const response = await API.get("/freelancers/invited", setAuthHeaders());
    return response.data.body;
  } catch (error) {
    return handleError(error);
  }
};

export const applyJob = async (data) => {
  try {
    const response = await API.post("/job/apply", data, setAuthHeaders());
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const createJob = async (formData) => {
  try {
    const response = await API.post("/job/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...setAuthHeaders().headers,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getAllJobsProposal = async () => {
  try {
    const response = await API.get("/jobs/proposals", setAuthHeaders());
    return response.data.body;
  } catch (error) {
    return handleError(error);
  }
};

export const userAllJobs = async () => {
  try {
    const response = await API.get("/user/jobs", setAuthHeaders());
    return response.data.body;
  } catch (error) {
    return handleError(error);
  }
};

export const getSingleJobDetails = async (id) => {
  try {
    const response = await API.get(
      `/job/get-job?job_id=${id}`,
      setAuthHeaders()
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getAgencyAllJobs = async () => {
  try {
    const response = await API.get("/agency/jobs", setAuthHeaders());
    return response.data.body;
  } catch (error) {
    return handleError(error);
  }
};

export const updateJob = async (id, data) => {
  try {
    const response = await API.patch(`/job/update?job_id=${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...setAuthHeaders().headers,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteJob = async (id) => {
  try {
    const response = await API.delete(`/job/delete`, {
      headers: {
        "Content-Type": "application/json",
        ...setAuthHeaders().headers,
      },
      data: { job_id: id },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const endJobContract = async (body) => {
  try {
    const response = await API.post("/contract/end", body, setAuthHeaders());
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const changeOldPassword = async (body) => {
  try {
    const response = await API.post("/reset-password", body, setAuthHeaders());
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const submitTask = async (body) => {
  try {
    const response = await API.post(
      "/offer/task/submit",
      body,
      setAuthHeaders("multipart/form-data")
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const taskApproveOrReject = async (body) => {
  try {
    const response = await API.post("/task/approve", body, setAuthHeaders());
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getTimeSheet = async (id) => {
  try {
    const response = await API.get(
      `timesheet/offer_id?ref=${id}`,
      setAuthHeaders()
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getAllTimeSheet = async () => {
  try {
    const response = await API.get("/timesheet", setAuthHeaders());
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getAllTimeSheetAgency = async () => {
  try {
    const response = await API.get(
      `/timesheet?is_agency=${true}`,
      setAuthHeaders()
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};
