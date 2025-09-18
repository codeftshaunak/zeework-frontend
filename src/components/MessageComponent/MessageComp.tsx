import {
  Box,
  Card,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { LuMessagesSquare } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useRouter, useParams } from "next/navigation";
import {
  getMessageDetails,
  getMessageUsers,
} from "../../helpers/APIs/messageApis";
import {
  markMessagesAsRead,
  setMessageUsers,
} from "../../redux/messageSlice/messageSlice";
import TimerDownloadCard from "../Common/TimerDownloadCard";
import {
  MessageBodySkeleton,
  MessageUsersSkeleton,
} from "../Skeletons/MessageSkeleton";
import MessageBody from "./MessageBody";
import MessageSearchBar from "./MessageSearchBar";
import MessageUserList from "./MessageUserList";
import SearchedUsers from "./SearchedUsers";
import { PiUserListDuotone } from "react-icons/pi";

const MessageComp = () => {
  const messageUsers = useSelector((state: any) => state.message.users);
  const [messageDetails, setMessageDetails] = useState({});
  const [selectedUser, setSelectedUser] = useState("");
  const [filteredUser, setFilteredUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [usersIsLoading, setUsersIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const contract_ref = searchParams.get("contract_ref");
  const profile = useSelector((state: any) => state.profile);
  const role = profile.profile.role;
  const [cookies] = useCookies(["activeagency"]);
  const activeAgency = cookies.activeagency;
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userId = activeAgency ? profile?.agency?._id : profile?.profile?._id;
  // Fetch message users
  const getMessageUser = async () => {
    setUsersIsLoading(true);
    try {
      const { body, code } = activeAgency
        ? await getMessageUsers("agency")
        : await getMessageUsers();
      if (code === 200) {
        dispatch(setMessageUsers(body));
      }
    } catch (error) {
      console.error("Error fetching message user:", error);
    }
    setUsersIsLoading(false);
  };

  // Fetch messages for a specific user
  const getMessagesList = async (receiver_id, contractRef) => {
    setIsLoading(true);
    router.push(`/message/${receiver_id}?contract_ref=${contractRef}`, {
      replace: true,
    });

    try {
      if (receiver_id) {
        if (!messageUsers?.length) await getMessageUser();

        const currentUser = messageUsers?.find(
          (user) =>
            (user?.user_details?.user_id === receiver_id ||
              user?.user_details?._id === receiver_id) &&
            user?.contract_details?.contract_ref === contractRef
        );

        setSelectedUser(currentUser);

        const { code, body } = await getMessageDetails(
          receiver_id,
          contractRef,
          activeAgency ? "agency" : "user"
        );

        if (code === 200 && body.messages?.length > 0) {
          let lastSenderId = null;
          body.messages?.forEach((message) => {
            if (message.sender_id === lastSenderId) {
              message.isRepeated = true;
            } else {
              message.isRepeated = false;
            }
            lastSenderId = message.sender_id;
          });
        }

        if (code === 200)
          setMessageDetails({
            ...body,
            reciever_details: {
              ...body.reciever_details,
              activity: currentUser?.user_details?.activity,
            },
          });
      }
    } catch (error) {
      console.error("Error fetching message details:", error);
    }
    setIsLoading(false);
  };

  // update messaging user activity
  useEffect(() => {
    if (selectedUser && messageUsers?.length) {
      const selectedUserActivity = messageUsers.find(
        (user) =>
          user.user_details.user_id === id || user.user_details._id === id
      )?.user_details?.activity;

      setMessageDetails((prev) => ({
        ...prev,
        reciever_details: {
          ...prev.reciever_details,
          activity: selectedUserActivity,
        },
      }));
    }
  }, [selectedUser, messageUsers]);

  // Handle user search input
  const handleSearchingUser = (query) => {
    setQuery(query);
    if (query.length) {
      // Split the query into individual words
      const queryWords = query?.toLowerCase()?.split(" ");

      const getUsers = messageUsers.filter((user) => {
        // Combine all searchable fields into a single string
        const userFields = [
          user?.user_details?.firstName,
          user?.user_details?.lastName,
          user?.user_details?.businessName,
          user?.contract_details?.title,
          user?.user_details?.agency_name,
        ]
          ?.filter(Boolean)
          ?.join(" ")
          ?.toLowerCase();

        // Check if every word in the query is included in the user's details
        return queryWords?.every((word) => userFields?.includes(word));
      });

      setFilteredUser(getUsers);
    } else {
      setFilteredUser([]);
    }
  };

  // Mark messages as read
  useEffect(() => {
    if (contract_ref && id) {
      dispatch(markMessagesAsRead({ contract_ref, id }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract_ref, id]);

  // Initial fetch of message users and messages
  useEffect(() => {
    if (id && contract_ref !== null && contract_ref !== "undefined")
      getMessagesList(id, contract_ref);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract_ref, id]);

  useEffect(() => {
    if (userId) getMessageUser();
  }, [userId]);

  // const sortedUsers = [...messageUsers].sort((a, b) => {
  //   const activityA = a.contract_details.activity
  //     ? new Date(a.contract_details.activity).getTime()
  //     : null;
  //   const activityB = b.contract_details.activity
  //     ? new Date(b.contract_details.activity).getTime()
  //     : null;

  //   if (activityA === null && activityB === null) {
  //     return 0;
  //   }

  //   if (activityA === null) {
  //     return 1;
  //   }

  //   if (activityB === null) {
  //     return -1;
  //   }

  //   return activityB - activityA;
  // });
  const sortedUsers = useMemo(() => {
    return [...messageUsers].sort((a, b) => {
      const activityA = a.contract_details.activity
        ? new Date(a.contract_details.activity).getTime()
        : null;
      const activityB = b.contract_details.activity
        ? new Date(b.contract_details.activity).getTime()
        : null;

      if (activityA === null && activityB === null) {
        return 0;
      }

      if (activityA === null) {
        return 1;
      }

      if (activityB === null) {
        return -1;
      }

      return activityB - activityA;
    });
  }, [messageUsers]);

  return (
    <HStack
      paddingTop={{ base: 2, md: 5 }}
      width="100%"
      maxH={{ base: "90vh", md: "90vh" }}
      alignItems="start"
      flexDirection={{ base: "column", md: "row" }}
      gap={{ md: 5 }}
    >
      {/* User list for mobile devices */}
      <Box display={{ md: "none" }}>
        <Drawer
          isOpen={isOpen}
          placement={"right"}
          onClose={onClose}
          size={"full"}
          isFullHeight={false}
        >
          <DrawerContent mt={"4.5rem"} bg={"transparent"} shadow={"none"}>
            <DrawerBody
              bg={"white"}
              width={"85%"}
              mx={"auto"}
              position={"relative"}
              pt={5}
              rounded={"xl"}
              className="border"
            >
              <Box className="w-full md:w-[250px]">
                <HStack gap={5} mb={2}>
                  <MessageSearchBar
                    query={query}
                    handleSearchingUser={handleSearchingUser}
                  />
                  <DrawerCloseButton
                    position={"unset"}
                    height={"fit-content"}
                    size={"25px"}
                  />
                </HStack>
                {query.length > 0 ? (
                  <SearchedUsers
                    filteredUser={filteredUser}
                    query={query}
                    setFilteredUser={setFilteredUser}
                    setQuery={setQuery}
                    handleOnClose={onClose}
                  />
                ) : usersIsLoading ? (
                  <MessageUsersSkeleton />
                ) : sortedUsers?.length ? (
                  <MessageUserList
                    users={sortedUsers}
                    contractRef={contract_ref}
                    id={id}
                    setQuery={setQuery}
                    handleOnClose={onClose}
                  />
                ) : (
                  <Text textAlign="center" mt={4}>
                    You haven&apos;t any message!
                  </Text>
                )}
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>

      {/* User list for larger devices */}
      <Box display={{ base: "none", md: "block" }} className="min-w-[250px]">
        <MessageSearchBar
          query={query}
          handleSearchingUser={handleSearchingUser}
        />
        {query.length > 0 ? (
          <SearchedUsers
            filteredUser={filteredUser}
            query={query}
            setFilteredUser={setFilteredUser}
            setQuery={setQuery}
          />
        ) : usersIsLoading ? (
          <MessageUsersSkeleton />
        ) : sortedUsers?.length ? (
          <MessageUserList
            users={sortedUsers}
            contractRef={contract_ref}
            id={id}
            setQuery={setQuery}
          />
        ) : (
          <Text textAlign="center" mt={4}>
            You haven&apos;t any message!
          </Text>
        )}
      </Box>

      <VStack className="max-xl:w-full w-[65%] relative">
        {/* Open user list on mobile devices */}
        <PiUserListDuotone
          className="absolute top-5 right-5 z-10 text-4xl bg-slate-100 hover:bg-slate-200 transition duration-300 cursor-pointer rounded-full p-1 text-primary md:hidden"
          onClick={onOpen}
        />

        {/* Messages body */}
        {id && contract_ref !== null && contract_ref !== "undefined" ? (
          isLoading ? (
            <MessageBodySkeleton />
          ) : (
            <MessageBody
              data={messageDetails}
              selectedUser={id}
              userDetails={messageUsers?.find(
                (user) => user.contract_details?.contract_ref === contract_ref
              )}
              isLoading={isLoading}
              isAgencyId={activeAgency && profile.agency._id}
            />
          )
        ) : id ? (
          <HStack alignItems="center" justifyContent="center" height="60vh">
            <Box className="flex flex-col items-center justify-center">
              <LuMessagesSquare className="text-8xl text-green-300 mb-4" />
              <p className="text-lg text-green-300 font-bold text-center">
                Can&apos;t find the contract details
              </p>
            </Box>
          </HStack>
        ) : (
          <HStack alignItems="center" justifyContent="center" height="60vh">
            <Box className="flex flex-col items-center justify-center">
              <LuMessagesSquare className="text-9xl text-green-300" />
            </Box>
          </HStack>
        )}
      </VStack>

      <VStack>
        <div className="max-xl:hidden">
          {role == 1 && (
            <Card
              className="px-10 py-2 cursor-pointer text-center"
              onClick={() => router.push("/my-jobs")}
            >
              <h2>Submit Work</h2>
            </Card>
          )}
          <div className="w-[70%]">
            <TimerDownloadCard msg={true} />
          </div>
        </div>
      </VStack>
    </HStack>
  );
};

export default React.memo(MessageComp);
