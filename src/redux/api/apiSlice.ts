import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { clearAuthData } from "../authSlice/authSlice";
import { BASE_URL } from "../../helpers/APIs/proxy";

// Helper to get token
const getAuthToken = (): string => {
  if (typeof window !== "undefined") {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.authtoken || "";
  }
  return "";
};

// Custom base query with auth + error handling
const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getAuthToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      headers.set("Access-Control-Allow-Credentials", "true");
      return headers;
    },
  });

  const result = await baseQuery(args, api, extraOptions);

  // If unauthorized, clear storage and redirect
  if (result.error?.status === 401) {
    api.dispatch(clearAuthData()); // optional redux clear
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("authtoken");

      setTimeout(() => {
        window.location.replace("/login");
      }, 500);
    }
  }

  return result;
};

// Define API slice
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: [
    "User",
    "Job",
    "Freelancer",
    "Client",
    "Agency",
    "Gig",
    "Message",
    "Report",
    "Payment",
    "Notification",
  ],
  keepUnusedDataFor: 60, // Keep cache for 60 seconds
  refetchOnMountOrArgChange: 30, // Refetch if older than 30s
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: () => ({}), // Endpoints defined in feature files
});
