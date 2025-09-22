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







// export const getSearchGigs = async (query) => {
//   const { skills, categories, searchText, minPrice, maxPrice } = query || {};
//   const availableQuery = {

//   const queryParams = new URLSearchParams(availableQuery).toString();
//   const endpoint = `/gig/search?${queryParams}`;
//   return makeApiRequest("GET", endpoint);
// };

export   const availableQuery = {

  const queryParams = new URLSearchParams(availableQuery).toString();
  const endpoint = `/gig/search?${queryParams}`;
  return makeApiRequest("GET", endpoint);
};

// Placeholder exports to fix build
export const placeholder = true;