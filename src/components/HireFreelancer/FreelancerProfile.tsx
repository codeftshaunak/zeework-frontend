import React from "react";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Skeleton,
  SkeletonCircle,
} from "@/components/ui/migration-helpers";

const FreelancerProfile = ({ profile }) => {
  const isLoading = !profile; // When profile is not passed yet
  const {
    firstName,
    lastName,
    professional_role,
    profile_image,
    agency_name,
    agency_profileImage,
  } = profile || {};

  return (
    <div
     
     
     
     
      className="bg-white flex p-3"
     
    >
      {/* Avatar or Skeleton */}
      {isLoading ? (
        <SkeletonCircle size="16" />
      ) : (
        <Avatar
          name={firstName ? `${firstName} ${lastName}` : agency_name}
          src={firstName ? profile_image : agency_profileImage}
          size="lg"
        />
      )}

      <div>
        {/* Name */}
        {isLoading ? (
          <Skeleton />
        ) : (
          <Heading as="h4" size="md" className="text-green-600">
            {firstName ? `${firstName} ${lastName}` : agency_name}
          </Heading>
        )}

        {/* Role */}
        {isLoading ? (
          <Skeleton />
        ) : (
          <Heading as="h5" size="sm" className="text-gray-600 tracking-wide">
            {firstName ? professional_role : "Agency Member"}
          </Heading>
        )}

        {/* Optional Location Box */}
        <div>
          {isLoading ? (
            <Skeleton />
          ) : (
            <div>{profile?.location || profile?.agency_location?.name}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile;
