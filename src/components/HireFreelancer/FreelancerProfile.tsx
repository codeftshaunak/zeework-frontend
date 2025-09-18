import {
  Avatar,
  Box,
  Flex,
  Heading,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";

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
    <Flex
      marginTop="25"
      width="100%"
      gap="3"
      border="1px solid lightgray"
      rounded="xl"
      paddingY="6"
      paddingX="10"
      bgColor={"white"}
      alignItems="center"
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

      <Box>
        {/* Name */}
        {isLoading ? (
          <Skeleton height="16px" width="150px" mb="2" />
        ) : (
          <Heading as="h4" size="md" className="text-green-600">
            {firstName ? `${firstName} ${lastName}` : agency_name}
          </Heading>
        )}

        {/* Role */}
        {isLoading ? (
          <Skeleton height="14px" width="120px" />
        ) : (
          <Heading as="h5" size="sm" className="text-gray-600 tracking-wide">
            {firstName ? professional_role : "Agency Member"}
          </Heading>
        )}

        {/* Optional Location Box */}
        <Box display="flex" gap="100px" marginTop="4px">
          {isLoading ? (
            <Skeleton height="12px" width="100px" />
          ) : (
            <Box>{profile?.location || profile?.agency_location?.name}</Box>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default FreelancerProfile;
