import { Avatar, AvatarBadge, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const MessageHeader = ({ receiverDetails, contractDetails }) => {
  const profileImage =
    receiverDetails?.agency_profileImage || receiverDetails?.profile_image;
  const name =
    receiverDetails?.agency_name ||
    `${receiverDetails?.firstName} ${receiverDetails?.lastName}`;
  const title =
    contractDetails?.title ||
    receiverDetails?.professional_role ||
    receiverDetails?.businessName;

  const router = useRouter();
  console.log(receiverDetails);
  return (
    <Flex borderBottom="1px" borderColor="gray.400" py={2} px={{ md: 2 }}>
      <Avatar
        src={profileImage}
        size={"md"}
        round="20px"
        marginRight="20px"
        border="1px solid var(--primarycolor)"
        name={name}
      >
        <AvatarBadge
          border="3.5px solid white"
          bg={`${
            receiverDetails?.activity === "online" ? "green" : "gray.300"
          }`}
          boxSize="0.8em"
          left={-2}
          top={0}
        />
      </Avatar>
      <Flex flexDir="column">
        <Text
          onClick={() =>
            router.push(
              `/profile/${
                receiverDetails?.agency_name
                  ? `a/${receiverDetails?._id}`
                  : `f/${receiverDetails?.user_id}`
              }`
            )
          }
          fontWeight="semibold"
          fontSize="lg"
          marginBottom="0"
          cursor="pointer"
          _hover={{ color: "primary.600" }}
        >
          {name}
        </Text>
        <Text fontWeight="" fontSize="sm" marginBottom="0">
          {title}
        </Text>
      </Flex>
    </Flex>
  );
};

export default MessageHeader;
