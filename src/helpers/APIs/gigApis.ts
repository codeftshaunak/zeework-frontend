import { handleApiError } from "./common";
import { API } from "./proxy";

const makeApiRequest = async (
  method,
  endpoint,
  data = null,
  customHeaders = {},
  contentType = "multipart/form-data"
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
    // Handle errors here directly
    handleApiError(error);
    const { path, message } = error.response?.data || {
      path: "",
      message: "Unknown error",
    };
    return error;
  }
};

export const uploadImages = async (data, query = "") =>
  makeApiRequest("POST", `/upload/multiple/images${query}`, data);

export const uploadMedia = async (data) =>
  makeApiRequest("POST", "/upload/video", data);

export const getFreelancerGigs = async () =>
  makeApiRequest("GET", "/freelancer/gigs");

export const updateFreelancerGig = async (data) =>
  makeApiRequest(
    "PATCH",
    `/gig/update?gig_id=${data._id}`,
    data,
    {},
    "application/json"
  );

export const deleteFreelancerGig = async (_id) =>
  makeApiRequest("DELETE", `/gig/delete?gig_id=${_id}`);

export const getGigDetails = async (_id) =>
  makeApiRequest("GET", `/gig/getbyGigId?gig_id=${_id}`);

// export const getSearchGigs = async (query) => {
//   const { skills, categories, searchText, minPrice, maxPrice } = query || {};
//   const availableQuery = {
//     ...(skills?.length && { skills }),
//     ...(categories?.length && { categories }),
//     ...(searchText && { searchText }),
//     ...(minPrice && { minPrice }),
//     ...(maxPrice && { maxPrice }),
//   };

//   const queryParams = new URLSearchParams(availableQuery).toString();
//   const endpoint = `/gig/search?${queryParams}`;
//   return makeApiRequest("GET", endpoint);
// };

export const getSearchGigs = async (query) => {
  const {
    type,
    skills,
    categories,
    searchText,
    minPrice,
    maxPrice,
    page,
    limit,
  } = query || {};
  const availableQuery = {
    ...(type && { type }),
    ...(skills?.length && { skills }),
    ...(categories?.length && { categories }),
    ...(searchText && { searchText }),
    ...(minPrice && { minPrice }),
    ...(maxPrice && { maxPrice }),
    ...(page && { page }),
    ...(limit && { limit }),
  };

  const queryParams = new URLSearchParams(availableQuery).toString();
  const endpoint = `/gig/search?${queryParams}`;
  return makeApiRequest("GET", endpoint);
};

export const updateGigPurchasesRequest = async (body) =>
  makeApiRequest("PATCH", "/gig/purchase/update", body, {}, "application/json");
