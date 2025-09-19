import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { clearAuthData } from '../authSlice/authSlice';
import { BASE_URL } from '../../helpers/APIs/proxy';

// Custom base query with authentication and error handling
const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Get auth token from localStorage (for CSR) or from the store state (for SSR)
  const getAuthToken = () => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.authtoken || '';
    }
    return '';
  };

  const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getAuthToken();
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      headers.set('Access-Control-Allow-Credentials', 'true');
      return headers;
    },
  });

  const result = await baseQuery(args, api, extraOptions);

  // Handle 401 errors (unauthorized)
  if (result.error && result.error.status === 401) {
    // Clear auth data from store
    api.dispatch(clearAuthData());

    // Clear localStorage only on client side
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('authtoken');

      // Redirect to login after a brief delay
      setTimeout(() => {
        window.location.replace('/login');
      }, 500);
    }
  }

  return result;
};

// Define the main API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  tagTypes: [
    'User',
    'Job',
    'Freelancer',
    'Client',
    'Agency',
    'Gig',
    'Message',
    'Report',
    'Payment',
    'Notification'
  ],
  keepUnusedDataFor: 60, // Keep unused data for 60 seconds
  refetchOnMountOrArgChange: 30, // Refetch data if it's older than 30 seconds
  refetchOnFocus: true, // Refetch when window regains focus
  refetchOnReconnect: true, // Refetch when connection is restored
  endpoints: () => ({}), // Individual endpoints will be defined in separate files
});

// Export hooks for usage in functional components
export const {} = apiSlice;