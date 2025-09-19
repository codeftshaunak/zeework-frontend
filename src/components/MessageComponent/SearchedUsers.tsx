import { Box, Flex, Avatar, Text, HStack, AvatarBadge } from "@/components/ui/migration-helpers";
import { useRouter } from "next/navigation";

interface SearchedUsersProps {
  filteredUser: any[];
  query: string;
  setFilteredUser: (users: any[]) => void;
  setQuery: (query: string) => void;
  handleOnClose?: () => void;
}

const SearchedUsers: React.FC<SearchedUsersProps> = ({
  filteredUser,
  query,
  setFilteredUser,
  setQuery,
  handleOnClose,
}) => {
  const router = useRouter();

  return (
    <Box>
      <Text className="text-lg font-semibold">Searched Users</Text>
      <Box
        overflowY="auto"
        border="1px solid"
        borderColor="gray.200"
        padding={2}
        rounded="lg"
        display="grid"
        maxHeight="md:300px"
        gap={5}
        sx={{
          "&::WebkitScrollbar": {
            width: "8px",
            borderRadius: "8px",
            backgroundColor: `rgba(0, 0, 0, 0.05)`,
          },
          "&::WebkitScrollbar-thumb": {
            backgroundColor: `rgba(0, 0, 0, 0.05)`,
            borderRadius: "8px",
          },
        }}
      >
        {!filteredUser?.length && query?.length > 0 && (
          <Text>Doesn&apos;t Matched</Text>
        )}
        {filteredUser.map((user) => {
          const name = user?.user_details?.agency_name
            ? user?.user_details?.agency_name
            : `${user?.user_details?.firstName} ${user?.user_details?.lastName}`;
          const photo = user?.user_details?.agency_profileImage
            ? user?.user_details?.agency_profileImage
            : user?.user_details?.profile_image;

          return (
            <Box
              key={user?.contract_details?.contract_ref}
              className="relative w-full border rounded-2xl bg-gray-100 cursor-pointer flex items-center"
              onClick={() => {
                router.push(
                  `/message/${
                    user?.user_details?.agency_name
                      ? user?.user_details?._id
                      : user?.user_details?.user_id
                  }?contract_ref=${user?.contract_details?.contract_ref}`,
                  { replace: true }
                );
                setFilteredUser([]);
                setQuery("");
                if (handleOnClose) handleOnClose();
              }}
            >
              <Flex align="center" justify="between" py={2} px={4}>
                <Box width="85px">
                  <Avatar src={photo} size="md" round="20px" name={name}>
                    <AvatarBadge
                      border="3.5px solid white"
                      bg={`${
                        user?.user_details?.activity === "online"
                          ? "green"
                          : "gray.300"
                      }`}
                      boxSize="0.8em"
                      left={-2}
                      top={0}
                    />
                  </Avatar>
                </Box>
                <Box width="full">
                  <HStack justifyContent="space-between">
                    <Text fontWeight="semibold" fontSize="13px">
                      {name}
                      {user?.user_details?.businessName &&
                        ` | ${user?.user_details?.businessName}`}
                    </Text>
                  </HStack>
                  <Text color="gray.600" fontSize="13px">
                    {user?.contract_details?.title?.slice(0, 20)}
                  </Text>
                </Box>
              </Flex>
              {user?.contract_details?.contract_ref && !user?.isRead && (
                <Box
                  width={2}
                  height={2}
                  rounded="full"
                  position="absolute"
                  top={4}
                  right={4}
                  bgColor="tomato"
                ></Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default SearchedUsers;
