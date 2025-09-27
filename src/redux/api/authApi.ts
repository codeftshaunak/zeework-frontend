import { apiSlice } from './apiSlice';

// Define types for auth responses
interface AuthResponse {
  code: number;
  msg: string;
  body?: {
    authtoken: string;
    user: any;
  };
}

interface SignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: number;
}

interface SignInRequest {
  email: string;
  password: string;
}

interface VerifyEmailRequest {
  token: string;
}

// Inject auth endpoints into the main API slice
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Sign up mutation
    signUp: builder.mutation<AuthResponse, SignUpRequest>({
      query: (credentials) => ({
        url: '/register',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),

    // Sign in mutation
    signIn: builder.mutation<AuthResponse, SignInRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
      // Handle successful login on the client side
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.code === 200 && data.body) {
            // Store auth data in localStorage (client-side only)
            if (typeof window !== 'undefined') {
              localStorage.setItem('user', JSON.stringify(data.body));
              localStorage.setItem('authtoken', data.body.authtoken);
            }
          }
        } catch (error) {
          // Handle error if needed
          console.error('Login failed:', error);
        }
      },
    }),

    // Email verification mutation
    verifyEmail: builder.mutation<AuthResponse, VerifyEmailRequest>({
      query: (data) => ({
        url: '/email/verification',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    // Get current user profile (for SSR/CSR hydration)
    getCurrentUser: builder.query<any, void>({
      query: () => '/user/profile',
      providesTags: ['User']
    }),

    // Logout mutation (clear server session if needed)
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
      // Handle logout on the client side
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          // Continue with logout even if server request fails
        } finally {
          // Clear client-side auth data
          if (typeof window !== 'undefined') {
            localStorage.removeItem('user');
            localStorage.removeItem('authtoken');
          }
          // Clear auth state in Redux
          dispatch(apiSlice.util.resetApiState());
        }
      },
    }),
  }),
});

// Export hooks for use in components
export const {
  useSignUpMutation,
  useSignInMutation,
  useVerifyEmailMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
} = authApi;