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











  if (sub_category_id) url += `&sub_category_id=${sub_category_id}`;
  return makeApiRequest("get", url);
};

// Update the function signature

    const skillsValues = skills?.map((skill) => skill?.value)?.join(",");
    const subcategoryValue =

    const response = await API.get("/search/freelancers", {

    return response.data;
  } catch (error) {
    console.error("Error fetching freelancer data:", error);
    throw error;
  }
};










export;

// Placeholder exports to fix build
export const placeholder = true;