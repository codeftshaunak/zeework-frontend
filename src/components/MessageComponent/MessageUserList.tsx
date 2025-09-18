import { Box, Flex, Avatar, HStack, Text, AvatarBadge } from "@chakra-ui/react";
import { useNavigate } from "next/navigation";

const MessageUserList = ({
  users,
  contractRef,
  id,
  setQuery,
  handleOnClose,
}) => {
  const router = useRouter();

  return (
    <Box
      overflowY="auto"
      maxH="90vh"
      pb={20}
      scrollBehavior="smooth"
      css={{
        "&::WebkitScrollbar": {
          display: "none",
        },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      {users.map((user) => {
        const userId = user?.user_details?.agency_name
          ? user?.user_details?._id
          : user?.user_details?.user_id;
        const isActive =
          user?.contract_details?.contract_ref === contractRef && userId === id;
        const name = user?.user_details?.agency_name
          ? user?.user_details?.agency_name
          : `${user?.user_details?.firstName} ${user?.user_details?.lastName}`;
        const photo = user?.user_details?.agency_profileImage
          ? user?.user_details?.agency_profileImage
          : user?.user_details?.profile_image;

        return (
          <Box
            key={user?.contract_details?.contract_ref}
            className={`relative h-[90px] w-full border rounded-2xl mt-[1rem] flex items-center cursor-pointer ${
              isActive ? "border-primary bg-green-100" : "bg-white"
            }`}
            onClick={() => {
              router.push(
                `/message/${userId}?contract_ref=${user?.contract_details?.contract_ref}`,
                { replace: true }
              );
              setQuery("");
              if (handleOnClose) handleOnClose();
            }}
          >
            <Flex align="center" justify="between" py={2} px={4}>
              <Box className="w-[85px]">
                <Avatar
                  size="md"
                  round="20px"
                  name={name}
                  src={photo}
                  border="1px solid var(--primarycolor)"
                >
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
                  {user?.contract_details?.title
                    ? user?.contract_details?.title?.slice(0, 20)
                    : "Unavailable contract"}
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
  );
};

export default MessageUserList;
