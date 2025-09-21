"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { ProfileHeader } from "./components/ProfileHeader";
import { SkillsSection } from "./components/SkillsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { EducationSection } from "./components/EducationSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { StatsSection } from "./components/StatsSection";
import { WorkHistorySection } from "./components/WorkHistorySection";
import ProfileUpdating from "./ProfileUpdating/ProfileUpdating";
import { formatTime, getUserLocation } from "../../../helpers/APIs/formet";
import { toast } from "@/lib/toast";

// TypeScript interfaces
interface FreelancerProfileProps {
  viewAs?: boolean;
}

interface ProfileState {
  firstName: string;
  lastName: string;
  profile_image: string;
  professional_role: string;
  location: string;
  hourly_rate: number;
  description: string;
  skills: any[];
  experience: any[];
  education: any[];
  portfolio: any[];
  linked_accounts: any[];
  categories?: any[];
  user_id?: string;
}

interface RootState {
  profile: {
    profile: ProfileState;
  };
}

// Mock data for stats (replace with actual RTK Query hook)
const mockStats = {
  totalEarnings: 15420,
  completedJobs: 23,
  hoursWorked: 1240,
  averageRating: 4.8,
  totalReviews: 19,
  successRate: 95,
  responseTime: "< 1 hour",
};

// Mock work history data (replace with actual RTK Query hook)
const mockWorkHistory = [
  {
    _id: "1",
    job_title: "E-commerce Website Development",
    client_name: "TechCorp Solutions",
    amount_earned: 2500,
    start_date: "2024-01-15",
    end_date: "2024-02-28",
    duration_hours: 120,
    rating: 5,
    review: "Excellent work! Delivered exactly what we needed on time.",
    skills_used: ["React", "Node.js", "MongoDB"],
    status: "completed" as const,
  },
  {
    _id: "2",
    job_title: "Mobile App UI/UX Design",
    client_name: "StartupXYZ",
    amount_earned: 1800,
    start_date: "2023-11-01",
    end_date: "2023-12-15",
    duration_hours: 80,
    rating: 4,
    review: "Great design skills and communication throughout the project.",
    skills_used: ["Figma", "UI/UX", "Prototyping"],
    status: "completed" as const,
  },
];

export const ModernFreelancerProfile: React.FC<FreelancerProfileProps> = ({
  viewAs = false,
}) => {
  const router = useRouter();
  const [localTime, setLocalTime] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [defaultValue, setDefaultValue] = useState<any>(null);
  const [isModal, setIsModal] = useState(false);
  const [workHistoryLoading, setWorkHistoryLoading] = useState(false);

  const profile = useSelector((state: RootState) => state.profile);
  const profileData = profile.profile || {};

  const getCurrentTimeAndLocation = async (): Promise<void> => {
    try {
      const currentDate = new Date();
      const currentTime = formatTime(currentDate);
      const location = await getUserLocation();
      setLocalTime(currentTime);
      console.log(
        `${location.latitude}, ${location.longitude} - ${currentTime} local time`
      );
    } catch (error) {
      console.error(error);
    }
  };

  const openUpdatingModal = (type: string, data: any = null): void => {
    setDefaultValue(data);
    setType(type);
    setIsModal(true);
  };

  const handleSettingsClick = () => {
    router.push("/setting");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getCurrentTimeAndLocation();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // TODO: Replace with actual RTK Query hooks
  // const { data: workHistory, isLoading: workHistoryLoading } = useGetWorkHistoryQuery();
  // const { data: stats } = useGetFreelancerStatsQuery();

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="space-y-8">
            {/* Profile Header */}
            <ProfileHeader
              profile={profileData}
              localTime={localTime}
              isOwner={!viewAs}
              onEditProfile={() => openUpdatingModal("Update Profile Photo")}
              onSettingsClick={handleSettingsClick}
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Left Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Stats Section */}
                <StatsSection
                  stats={mockStats}
                  isVerified={true} // TODO: Get from actual profile data
                />

                {/* Education Section - Desktop */}
                <div className="hidden lg:block">
                  <EducationSection
                    education={profileData.education || []}
                    isOwner={!viewAs}
                    onAddEducation={() => openUpdatingModal("Add Education")}
                    onEditEducation={(edu) => openUpdatingModal("Update Education", edu)}
                    onDeleteEducation={(edu) => openUpdatingModal("Delete Education", edu)}
                  />
                </div>

                {/* Experience Section - Desktop */}
                <div className="hidden lg:block">
                  <ExperienceSection
                    experiences={profileData.experience || []}
                    isOwner={!viewAs}
                    onAddExperience={() => openUpdatingModal("Add Experience")}
                    onEditExperience={(exp) => openUpdatingModal("Update Experience", exp)}
                    onDeleteExperience={(exp) => openUpdatingModal("Delete Experience", exp)}
                  />
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3 space-y-8">
                {/* Skills Section */}
                <SkillsSection
                  skills={profileData.skills || []}
                  isOwner={!viewAs}
                  onEditSkills={() => openUpdatingModal("Update Skills")}
                />

                {/* Portfolio Section */}
                <PortfolioSection
                  portfolio={profileData.portfolio || []}
                  categories={profileData.categories}
                  isOwner={!viewAs}
                  onAddProject={() => openUpdatingModal("Add New Project")}
                  onViewProject={(project) => {
                    // TODO: Implement project viewer modal
                    toast.info("Project viewer coming soon!");
                  }}
                />

                {/* Education Section - Mobile */}
                <div className="lg:hidden">
                  <EducationSection
                    education={profileData.education || []}
                    isOwner={!viewAs}
                    onAddEducation={() => openUpdatingModal("Add Education")}
                    onEditEducation={(edu) => openUpdatingModal("Update Education", edu)}
                    onDeleteEducation={(edu) => openUpdatingModal("Delete Education", edu)}
                  />
                </div>

                {/* Experience Section - Mobile */}
                <div className="lg:hidden">
                  <ExperienceSection
                    experiences={profileData.experience || []}
                    isOwner={!viewAs}
                    onAddExperience={() => openUpdatingModal("Add Experience")}
                    onEditExperience={(exp) => openUpdatingModal("Update Experience", exp)}
                    onDeleteExperience={(exp) => openUpdatingModal("Delete Experience", exp)}
                  />
                </div>

                {/* Work History Section */}
                <WorkHistorySection
                  workHistory={mockWorkHistory}
                  isLoading={workHistoryLoading}
                />

                {/* Gigs Section Placeholder */}
                <div className="bg-white rounded-lg border border-gray-200/60 shadow-sm p-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {viewAs ? "Freelancer Gigs" : "Your Gigs"}
                  </h2>
                  <hr className="mb-6" />
                  <p className="text-gray-600 mb-6">
                    Projects are a new way to earn on ZeeWork. Create project
                    offerings that highlight your strengths and attract more clients.
                  </p>
                  {!viewAs && (
                    <button
                      className="px-6 py-2 rounded-full border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-colors font-semibold"
                      onClick={() => router.push("/freelancer/gig")}
                    >
                      Manage Gigs
                    </button>
                  )}
                  {/* TODO: Add ProfileGigCards component */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Updating Modal */}
      <ProfileUpdating
        type={type}
        defaultValue={defaultValue}
        setDefaultValue={setDefaultValue}
        isModal={isModal}
        setIsModal={setIsModal}
      />
    </HomeLayout>
  );
};