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
    const { path, message, isError } = handleApiError(error);
    return { path, message, isError };
  }
};

export const acceptInvitation = async (data) =>
  makeApiRequest("put", "/invitation-status-update", data);

export const updateOfferRequest = async (data) =>
  makeApiRequest("post", "/offer/update", data);

export const offerDetails = async (offer_id) =>
  makeApiRequest("get", `/freelancer/offer-details?offer_id=${offer_id}`);

export const workSubmit = async (data) =>
  makeApiRequest("post", "/offer/task/submit", data, {}, "multipart/form-data");

export const invitationDetails = async (invite_id) =>
  makeApiRequest(
    "get",
    `/freelancer/invitation-details?invitation_id=${invite_id}`
  );

export const acceptAgencyInvitation = (data) =>
  makeApiRequest("put", "/agency/invitation/freelancer/respond", data);

export const freelancerReports = async () =>
  makeApiRequest("get", "/report/freelancer");

export const createGig = async (data) =>
  makeApiRequest("post", "/gig/freelancer/create", data);

export const getSubCategory = async (_id) =>
  makeApiRequest("get", `/categories/subcategories?category_id=${_id}`);

export const getSkills = async (category_id="", sub_category_id= "") => {
  let url = `/categories/skills?category_id=${category_id}`;
  if (sub_category_id) url += `&sub_category_id=${sub_category_id}`;
  return makeApiRequest("get", url);
};

// Update the function signature
export const getFreelancers = async (
  page,
  skills,
  searchText,
  hourlyRateMin,
  hourlyRateMax,
  categoryId,
  selectedSubCategories
) => {
  try {
    // const authtoken = localStorage.getItem("authtoken");
    const skillsValues = skills?.map((skill) => skill?.value)?.join(",");
    const subcategoryValue =
      Array.isArray(selectedSubCategories) && selectedSubCategories?.length > 0
        ? selectedSubCategories?.map((category) => category?.value)?.join(",")
        : null;

    const response = await API.get("/search/freelancers", {
      headers: {
        "Content-Type": "application/json",
        // token: authtoken,
      },
      params: {
        page: page,
        searchText: searchText,
        skills: skillsValues,
        hourlyRateMin: hourlyRateMin,
        hourlyRateMax: hourlyRateMax,
        categoryId: categoryId,
        ...(subcategoryValue && { subCategoryId: subcategoryValue }),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching freelancer data:", error);
    throw error;
  }
};

export const getCategories = async () => makeApiRequest("get", "/categories");

export const getCountries = async () => makeApiRequest("get", "/get-countries");

export const deleteExperience = async (data) =>
  makeApiRequest("delete", "/delete-experience", data);

export const deleteEducation = async (data) =>
  makeApiRequest("delete", "/delete-education", data);

export const deleteFreelancerPortfolio = async (id) =>
  makeApiRequest("delete", "/delete/freelancer/project", { project_id: id });

export const getPurchasesGigInfo = async (id) =>
  makeApiRequest("get", `/gig/purchase/detailsById?gigId=${id}`);

export const getWorkHistory = async () =>
  makeApiRequest("get", "/user/workhistory");

export const getFreelancerById = async (id) =>
  makeApiRequest("get", `/user?user_id=${id}`);

export const getInvitationOfAgency = async (id) =>
  makeApiRequest("get", `/agency/invitation/details?invite_id=${id}`);

export const updatePortfolioProject = async (data) =>
  makeApiRequest("patch", "/update/portfolio-project", data);
