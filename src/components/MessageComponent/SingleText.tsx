import { HStack, Box, Flex, Text, Avatar, AvatarBadge } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import CardDetails from "./CardDetails";
import { format, differenceInMinutes, differenceInHours } from "date-fns";
import Linkify from "react-linkify";
import { MdDelete } from "react-icons/md";

const SingleText = ({
  user,
  userId,
  senderDetails,
  role,
  receiverDetails,
  handleAction,
}) => {
  const [isMore, setIsMore] = useState(false);
  const [timeDifference, setTimeDifference] = useState("");

  const getTimeDifference = () => {
    const messageDate = new Date(user.created_at);
    const now = new Date();

    const minutesDiff = differenceInMinutes(now, messageDate);
    const hoursDiff = differenceInHours(now, messageDate);

    if (minutesDiff < 1) return "now";
    if (minutesDiff < 10) return `${minutesDiff} min ago`;
    if (hoursDiff < 24) return format(messageDate, "hh:mm a");
    return format(messageDate, "MM/dd/yyyy");
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeDifference(getTimeDifference());
    }, 60000);

    setTimeDifference(getTimeDifference());

    return () => clearInterval(timerId);
  }, []);

  const getProfileImage = () => {
    if (user.sender_id === userId) {
      return senderDetails?.agency_profileImage || senderDetails?.profile_image;
    }
    return (
      receiverDetails?.agency_profileImage || receiverDetails?.profile_image
    );
  };

  const getDisplayName = () => {
    if (user.sender_id === userId) {
      return (
        senderDetails?.agency_name ||
        `${senderDetails?.firstName} ${senderDetails?.lastName}`
      );
    }
    return (
      receiverDetails?.agency_name ||
      `${receiverDetails?.firstName} ${receiverDetails?.lastName}`
    );
  };

  return (
    <Box position="relative" padding={{ md: "4px" }} width={"100%"}>
      {user.sender_id === userId ? (
        <HStack justifyContent={{ md: "end" }} width={"100%"}>
          <HStack
            flexDirection={{ base: "column-reverse", md: "row" }}
            alignItems={{ md: "start" }}
            gap={{ base: "2px", md: "15px" }}
            width={"100%"}
          >
            <Box className="md:ml-auto">
              {!user.isRepeated && (
                <Text fontWeight={"600"} textAlign={"right"}>
                  You
                </Text>
              )}
              <Flex
                width={"100%"}
                textAlign={"right"}
                flexDir="column"
                alignContent="end"
                alignItems="end"
                bgColor={"#dcf7e3"}
                mt={user.isRepeated ? -1 : 0}
                mb={1}
                paddingY={2}
                paddingX={4}
                gap={2}
                rounded={"md"}
                position={"relative"}
                onMouseEnter={() => setIsMore(true)}
                onMouseLeave={() => setIsMore(false)}
              >
                <>
                  <Linkify>
                    <Box
                      fontSize={"1rem"}
                      color="gray.600"
                      dangerouslySetInnerHTML={{ __html: user.message }}
                    />
                  </Linkify>

                  {user?.card_details?.title && (
                    <CardDetails message={user} user_id={userId} role={role} />
                  )}
                </>
                <p className="text-[12px] text-right mt-1 -mb-1 text-gray-300">
                  {timeDifference}
                </p>
                {isMore && (
                  <div className="absolute -bottom-2 left-0 z-10">
                    <div className="relative">
                      <div
                        className="cursor-pointer bg-white hover:bg-gray-200/30 p-1 rounded-full shadow-[rgba(17,_17,_26,_0.1)_0px_0px_10px] border border-[#dcf7e3]"
                        onClick={() => handleAction(user._id, "delete")}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  </div>
                )}
              </Flex>
            </Box>
            <Box ml={{ base: "auto", md: "0" }} width={"32px"}>
              {!user.isRepeated && (
                <Avatar
                  size="sm"
                  round="20px"
                  mt={{ base: 5, md: 0 }}
                  border={"1px solid var(--primarycolor)"}
                  src={getProfileImage()}
                  name={getDisplayName()}
                />
              )}
            </Box>
          </HStack>
        </HStack>
      ) : (
        <HStack>
          <HStack
            flexDirection={{ base: "column", md: "row" }}
            alignItems={{ md: "start" }}
            gap={{ base: "2px", md: "15px" }}
            width={"100%"}
          >
            <Box width={"32px"}>
              {!user.isRepeated && (
                <Avatar
                  size="sm"
                  round="20px"
                  mt={{ base: 5, md: 0 }}
                  border={"1px solid var(--primarycolor)"}
                  src={getProfileImage()}
                  name={getDisplayName()}
                >
                  <AvatarBadge
                    border="2px solid white"
                    bg={`${
                      receiverDetails?.activity === "online"
                        ? "green"
                        : "gray.300"
                    }`}
                    boxSize="0.8em"
                    left={-1.5}
                    top={0}
                  />
                </Avatar>
              )}
            </Box>
            <Box>
              {!user.isRepeated && (
                <Text fontWeight={"600"}>{getDisplayName()}</Text>
              )}
              <Flex
                flexDir="column"
                bgColor={"gray.100"}
                paddingY={2}
                paddingX={4}
                rounded={"md"}
                position={"relative"}
                onMouseEnter={() => setIsMore(true)}
                onMouseLeave={() => setIsMore(false)}
              >
                <>
                  <Linkify>
                    <Box
                      fontSize="1rem"
                      color="gray.600"
                      dangerouslySetInnerHTML={{ __html: user.message }}
                    />
                  </Linkify>

                  {user?.card_details?.title && (
                    <CardDetails message={user} user_id={userId} role={role} />
                  )}
                </>
                <p className="text-[12px] text-left mt-1 -mb-1 text-gray-300">
                  {timeDifference}
                </p>
              </Flex>
            </Box>
          </HStack>
        </HStack>
      )}
    </Box>
  );
};

export default SingleText;
