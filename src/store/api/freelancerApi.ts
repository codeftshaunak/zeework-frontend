import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query configuration
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  prepareHeaders: (headers, { getState }) => {
    // Add auth token if available
    const token = (getState() as any)?.auth?.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// Types
interface FreelancerProfile {
  _id: string;
  firstName: string;
  lastName: string;
  profile_image: string;
  professional_role: string;
  location: string;
  hourly_rate: number;
  description: string;
  skills: Array<{
    _id: string;
    value: string;
  }>;
  experience: Array<{
    _id: string;
    company_name: string;
    position: string;
    job_location: string;
    job_description: string;
    start_date: string;
    end_date: string;
    is_current?: boolean;
  }>;
  education: Array<{
    _id: string;
    institution: string;
    degree_name: string;
    field_of_study?: string;
    start_date: string;
    end_date: string;
    grade?: string;
    description?: string;
  }>;
  portfolio: Array<{
    _id: string;
    title: string;
    description: string;
    images?: string[];
    technologies?: string[];
    live_url?: string;
    github_url?: string;
    category?: string;
  }>;
  linked_accounts: unknown[];
  categories?: unknown[];
  user_id: string;
}

interface FreelancerStats {
  totalEarnings: number;
  completedJobs: number;
  hoursWorked: number;
  averageRating: number;
  totalReviews: number;
  successRate: number;
  responseTime: string;
  isVerified: boolean;
}

interface WorkHistoryItem {
  _id: string;
  job_title: string;
  client_name: string;
  client_avatar?: string;
  amount_earned: number;
  start_date: string;
  end_date: string;
  duration_hours?: number;
  rating?: number;
  review?: string;
  skills_used?: string[];
  status: 'completed' | 'in_progress' | 'cancelled';
}

interface AssociatedAgency {
  agency_id: string;
  agency_details: {
    agency_name: string;
    agency_profileImage?: string;
    agency_officeLocation?: {
      country: string;
    };
    agency_verified?: boolean;
  };
  join_date: string;
  leave_date?: string;
}

// API slice
export const freelancerApi = createApi({
  reducerPath: 'freelancerApi',
  baseQuery,
  tagTypes: ['FreelancerProfile', 'WorkHistory', 'Stats', 'Agency'],
  endpoints: (builder) => ({
    // Get freelancer profile
    getFreelancerProfile: builder.query<FreelancerProfile, string>({
      query: (userId) => `/freelancer/profile/${userId}`,
      providesTags: ['FreelancerProfile'],
    }),

    // Get freelancer stats
    getFreelancerStats: builder.query<FreelancerStats, void>({
      query: () => '/freelancer/stats',
      providesTags: ['Stats'],
    }),

    // Get work history
    getWorkHistory: builder.query<WorkHistoryItem[], void>({
      query: () => '/freelancer/work-history',
      providesTags: ['WorkHistory'],
    }),

    // Get associated agency
    getAssociatedAgency: builder.query<AssociatedAgency, void>({
      query: () => '/freelancer/associated-agency',
      providesTags: ['Agency'],
    }),

    // Update profile
    updateFreelancerProfile: builder.mutation<FreelancerProfile, Partial<FreelancerProfile>>({
      query: (profileData) => ({
        url: '/freelancer/profile',
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['FreelancerProfile'],
    }),

    // Add experience
    addExperience: builder.mutation<any, any>({
      query: (experienceData) => ({
        url: '/freelancer/experience',
        method: 'POST',
        body: experienceData,
      }),
      invalidatesTags: ['FreelancerProfile'],
    }),

    // Update experience
    updateExperience: builder.mutation<any, { id: string; data: unknown }>({
      query: ({ id, data }) => ({
        url: `/freelancer/experience/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['FreelancerProfile'],
    }),

    // Delete experience
    deleteExperience: builder.mutation<any, string>({
      query: (id) => ({
        url: `/freelancer/experience/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FreelancerProfile'],
    }),

    // Add education
    addEducation: builder.mutation<any, any>({
      query: (educationData) => ({
        url: '/freelancer/education',
        method: 'POST',
        body: educationData,
      }),
      invalidatesTags: ['FreelancerProfile'],
    }),

    // Update education
    updateEducation: builder.mutation<any, { id: string; data: unknown }>({
      query: ({ id, data }) => ({
        url: `/freelancer/education/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['FreelancerProfile'],
    }),

    // Delete education
    deleteEducation: builder.mutation<any, string>({
      query: (id) => ({
        url: `/freelancer/education/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FreelancerProfile'],
    }),

    // Add portfolio project
    addPortfolioProject: builder.mutation<any, any>({
      query: (projectData) => ({
        url: '/freelancer/portfolio',
        method: 'POST',
        body: projectData,
      }),
      invalidatesTags: ['FreelancerProfile'],
    }),

    // Update portfolio project
    updatePortfolioProject: builder.mutation<any, { id: string; data: unknown }>({
      query: ({ id, data }) => ({
        url: `/freelancer/portfolio/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['FreelancerProfile'],
    }),

    // Delete portfolio project
    deletePortfolioProject: builder.mutation<any, string>({
      query: (id) => ({
        url: `/freelancer/portfolio/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FreelancerProfile'],
    }),

    // Update skills
    updateSkills: builder.mutation<any, string[]>({
      query: (skills) => ({
        url: '/freelancer/skills',
        method: 'PUT',
        body: { skills },
      }),
      invalidatesTags: ['FreelancerProfile'],
    }),

    // Upload profile image
    uploadProfileImage: builder.mutation<{ imageUrl: string }, FormData>({
      query: (formData) => ({
        url: '/freelancer/upload-image',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['FreelancerProfile'],
    }),
  }),
});

// Export hooks
export const {
  useGetFreelancerProfileQuery,
  useGetFreelancerStatsQuery,
  useGetWorkHistoryQuery,
  useGetAssociatedAgencyQuery,
  useUpdateFreelancerProfileMutation,
  useAddExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
  useAddEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
  useAddPortfolioProjectMutation,
  useUpdatePortfolioProjectMutation,
  useDeletePortfolioProjectMutation,
  useUpdateSkillsMutation,
  useUploadProfileImageMutation,
} = freelancerApi;

export default freelancerApi;