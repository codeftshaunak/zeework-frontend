"use client";


import UserProfileSetting from "../../Profile/UserProfileSetting";
import HomeLayout from "../../Layouts/HomeLayout";
import UserProfile from "@/components/Profile";

// Initial Profile Page
export const Profile = () => {
  return (
    <HomeLayout>
      <UserProfile />
    </HomeLayout>
  );
};

// Profile Setting Page
export const ProfileSetting = () => {
  return (
    <HomeLayout>
      <UserProfileSetting />
    </HomeLayout>
  );
};
