import axios from "axios";
import { handleApiError } from "./common";
import { BASE_URL } from "./proxy";

export const API = axios.create({
  baseURL: BASE_URL,
});

export 
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

export 
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

export 
export 
export 
export 
export export 
export 
export 
export 
export 
export 
export 
export 
export 
export 
export 